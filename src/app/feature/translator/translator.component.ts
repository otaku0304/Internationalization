import { Component, OnInit, inject, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslationManagerService, TranslationUnit } from '../../core/services/translation-manager.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-translator',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './translator.component.html',
    styleUrls: ['./translator.component.scss']
})
export class TranslatorComponent implements OnInit {
    private http = inject(HttpClient);
    private xliffService = inject(TranslationManagerService);

    // UI state
    searchQuery = signal('');

    // Computed results based on search
    filteredUnits = computed(() => {
        const query = this.searchQuery().toLowerCase();
        const units = this.xliffService.units();
        if (!query) return units;
        return units.filter(u =>
            u.id.toLowerCase().includes(query) ||
            u.source.toLowerCase().includes(query) ||
            (u.target || '').toLowerCase().includes(query)
        );
    });

    constructor() {
        // Reload data when active language changes
        effect(() => {
            const lang = this.xliffService.activeLang();
            this.loadTranslations(lang);
        }, { allowSignalWrites: true });
    }

    async ngOnInit() {
        // Initial load is handled by the effect on activeLang
    }

    async loadTranslations(lang: string) {
        try {
            // Always load the base messages.xlf for source text
            const sourceXliff = await firstValueFrom(this.http.get('translate/messages.xlf', { responseType: 'text' }));

            let targetXliff: string | undefined;
            // If lang is not English (the source), try to load its specific xlf
            if (lang !== 'en') {
                try {
                    targetXliff = await firstValueFrom(this.http.get(`translate/messages.${lang}.xlf`, { responseType: 'text' }));
                } catch (e) {
                    console.warn(`No existing translation file for ${lang}, starting fresh.`);
                }
            }

            const units = await this.xliffService.parseXliff(sourceXliff, targetXliff);
            this.xliffService.setUnits(units);
        } catch (e) {
            console.error('Failed to load XLIFF data', e);
        }
    }

    get languages() {
        return this.xliffService.languages();
    }

    get activeLang() {
        return this.xliffService.activeLang();
    }

    set activeLang(code: string) {
        this.xliffService.setActiveLang(code);
    }

    updateValue(id: string, event: Event) {
        const val = (event.target as HTMLTextAreaElement).value;
        this.xliffService.updateTranslation(id, val);
    }

    exportXliff() {
        const content = this.xliffService.generateXliff(this.activeLang, this.xliffService.units());
        this.xliffService.exportFile(content, `messages.${this.activeLang}.xlf`, 'application/xml');
    }

    exportJson() {
        const content = this.xliffService.generateJson(this.xliffService.units());
        this.xliffService.exportFile(content, `${this.activeLang}.json`, 'application/json');
    }

    updateSearch(event: Event) {
        this.searchQuery.set((event.target as HTMLInputElement).value);
    }
}
