const push = (element, parent) => parent.append(element);

const setRandomBackgroundColor = (element) => {
    let r = Math.floor(Math.random() * (255)),
        g = Math.floor(Math.random() * (255)),
        b = Math.floor(Math.random() * (255));
    if (r !== 255 && g !== 255 && b !== 255) {
        if (r < 100 || g < 70 || b < 100) element.style.color = "#ffffff";
        element.style.backgroundColor = '#' + r.toString(16) + g.toString(16) + b.toString(16);
    }
};
