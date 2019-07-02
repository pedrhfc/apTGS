//bubblesort instance mode
var p = new p5(function(sketch) {
    var numbers, columnWidth, sorter;

    // sketch.setup = function() {
    sketch.setup = () => {
        sketch.createCanvas(600, 400);
        numbers = Array(50)
            .fill()
            .map(() => sketch.random(1));
        columnWidth = 600 / numbers.length;
        sorter = bubbleSort();
        t0 = performance.now();

        sketch.fill(255);
        sketch.noStroke();
    };

    // sketch.draw = function() {
    sketch.draw = () => {
        sketch.background(0);

        for (var i = 0; i < numbers.length; i++) {
            var columnHeight = sketch.map(numbers[i], 0, 1, 0, 400);
            sketch.rect(i * columnWidth, 400, columnWidth, -columnHeight);
        }

        if (sorter.next().done) {
            sketch.noLoop();
        }
    };

    function* bubbleSort() {
        for (var i = numbers.length - 1; i > 0; i--) {
            for (var j = 0; j < i; j++) {
                if (numbers[j] > numbers[j + 1]) {
                    var t = numbers[j];
                    numbers[j] = numbers[j + 1];
                    numbers[j + 1] = t;
                }
                yield;
            }
        }
    }
});


//quicksort instance mode
var p1 = new p5(function(sketch1) {
    var values = [];
    var w = 10;

    var states = [];

    // sketch.setup = function() {
    sketch1.setup = () => {
        sketch1.createCanvas(600, 400);
        values = new Array(sketch1.floor(600 / w));
        for (var i = 0; i < values.length; i++) {
            values[i] = sketch1.random(400);
            states[i] = -1;
        }
        quickSort(values, 0, values.length - 1);
    };

    async function quickSort(arr, start, end) {
        if (start >= end) {
            return;
        }
        var index = await partition(arr, start, end);
        states[index] = -1;

        await Promise.all([
            quickSort(arr, start, index - 1),
            quickSort(arr, index + 1, end)
        ]);
    }

    async function partition(arr, start, end) {
        for (var i = start; i < end; i++) {
            states[i] = 1;
        }

        var pivotValue = arr[end];
        var pivotIndex = start;
        states[pivotIndex] = 0;
        for (var i = start; i < end; i++) {
            if (arr[i] < pivotValue) {
                await swap(arr, i, pivotIndex);
                states[pivotIndex] = -1;
                pivotIndex++;
                states[pivotIndex] = 0;
            }
        }
        await swap(arr, pivotIndex, end);

        for (var i = start; i < end; i++) {
            if (i != pivotIndex) {
                states[i] = -1;
            }
        }

        return pivotIndex;
    }

    // sketch.draw = function() {
    sketch1.draw = () => {
        sketch1.background(0);

        for (var i = 0; i < values.length; i++) {
            sketch1.noStroke();
            if (states[i] == 0) {
                sketch1.fill("#E0777D");
            } else if (states[i] == 1) {
                sketch1.fill("#f2f5f8");
            } else {
                sketch1.fill(255);
            }
            sketch1.rect(i * w, 400 - values[i], w, values[i]);
        }
    };

    async function swap(arr, a, b) {
        await sleep(50);
        var temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
});