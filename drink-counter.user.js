// ==UserScript==
// @name         CyTube Enhanced Drink Counter
// @namespace    http://neet.horse/
// @version      0.1.0
// @description  Shows CyTube drink calls in the drink bar
// @author       You
// @match        https://cytu.be/r/*
// @icon         https://resources.pink.horse/images/backgrounds/drinkbar_left.png
// @grant        none
// ==/UserScript==
(function() {
    var backupFormatChatMessage = window.formatChatMessage;

    function stripHtml(html) {
        return html.replace(/<\/?[^>]+(>|$)/g, "");
    }

    function hookFormatChatMessage(data, last) {
        var div = backupFormatChatMessage(data, last);

        if (div[0].classList.contains('drink')) {
            var text = document.getElementById('drinkcount').innerText;
            document.getElementById('drinkcount')
                .innerText = stripHtml(data.msg) + ' (' + text.replace(/drinks?/i, '').trim() + ')';
        }
        return div;
    }

    var interval = setInterval(function() {
        if (window.formatChatMessage != hookFormatChatMessage) {
            backupFormatChatMessage = window.formatChatMessage;
            window.formatChatMessage = hookFormatChatMessage;
            console.log('[CyTube Enhanced Drink Counter] Hooked window.formatChatMessage');
            // clearInterval(interval);
        }
    }, 1000);
})();
