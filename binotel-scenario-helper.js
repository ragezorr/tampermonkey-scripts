// ==UserScript==
// @name         Часто используемый сценарий
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Показывает самый часто используемый сценарий справа от кнопки "Добавить номер только для входящих звонков"
// @match        https://panel.binotel.com/?module=pbxNumbers&companyID=*
// @grant        none
// @updateURL
// @downloadURL
// ==/UserScript==

(function() {
    'use strict';

    function getMostFrequentScenario() {
        const scenarioCounts = {};
        const rows = document.querySelectorAll('table.sortableTable tbody tr');

        rows.forEach(row => {
            const scenarioCell = row.querySelector('td:nth-child(5) a');
            if (scenarioCell) {
                const name = scenarioCell.textContent.trim();
                if (name) {
                    scenarioCounts[name] = (scenarioCounts[name] || 0) + 1;
                }
            }
        });

        // Определяем наиболее частый сценарий
        let mostFrequent = null;
        let maxCount = 0;
        for (const [name, count] of Object.entries(scenarioCounts)) {
            if (count > maxCount) {
                mostFrequent = name;
                maxCount = count;
            }
        }

        return mostFrequent;
    }

    function insertResult() {
        const mostFrequent = getMostFrequentScenario();
        if (!mostFrequent) return;

        const container = document.querySelector('.span6.add-button');
        if (!container) return;

        const resultBox = document.createElement('div');
        resultBox.style.marginLeft = '20px';
        resultBox.style.display = 'inline-block';
        resultBox.style.padding = '10px 15px';
        resultBox.style.background = '#222';
        resultBox.style.color = '#fff';
        resultBox.style.borderRadius = '5px';
        resultBox.style.fontSize = '14px';
        resultBox.style.maxWidth = '300px';

        resultBox.textContent = `🔥 ${mostFrequent}`;

        container.appendChild(resultBox);
    }

    // Ждём полной загрузки страницы
    window.addEventListener('load', () => {
        setTimeout(insertResult, 500);
    });

})();
