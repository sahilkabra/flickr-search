// React@16 expects `requestAnimationFrame` to be present in the window object
// and gives warnings if it cannot find.
global.requestAnimationFrame = callback => {
    setTimeout(callback, 0);
};

// RXJS assumes requestAnimationFrame and cancelAnimationFrame available as pair.
// Should mock cancelAnimationFrame as we are already mocking requestAnimationFrame.
// https://github.com/ReactiveX/rxjs/issues/2260
global.cancelAnimationFrame = callback => {
    setTimeout(callback, 0);
};

const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });
