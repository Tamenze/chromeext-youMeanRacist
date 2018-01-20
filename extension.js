document.addEventListener('DOMContentLoaded', function() {
    var button = document.getElementById('changeText');
    button.addEventListener('click', function () {
        document.getElementById('buttonConvert').innerText = 'Clicked button';

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {}, function(response) {
                document.getElementById('changeText').innerText = 'Text corrected.';
                console.log('success');
                setTimeout(function(){window.close();},600);
                
            });
        });
    });
});				