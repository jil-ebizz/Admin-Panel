 // Replace Math.random() with a pseudo-random number generator to get reproducible results in e2e tests
        // Based on https://gist.github.com/blixt/f17b47c62508be59987b
        var _seed = 42;
        Math.random = function() {
        _seed = _seed * 16807 % 2147483647;
        return (_seed - 1) / 2147483646;
        };

        var colors = [
            '#008FFB',
            '#00E396',
            '#FEB019',
            '#FF4560',
            '#775DD0',
            '#546E7A',
            '#26a69a',
            '#D10CE8'
        ]

        window.Promise ||
        document.write(
            '<script src="https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js"><\/script>'
        )
        window.Promise ||
        document.write(
            '<script src="https://cdn.jsdelivr.net/npm/eligrey-classlist-js-polyfill@1.2.20171210/classList.min.js"><\/script>'
        )
        window.Promise ||
        document.write(
            '<script src="https://cdn.jsdelivr.net/npm/findindex_polyfill_mdn"><\/script>'
        )