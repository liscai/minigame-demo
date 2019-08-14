module.exports = function(PIXI, app, obj, callBack) {
    let container = new PIXI.Container(),
        goBack = {
            button: new PIXI.Graphics(),
            arrow: new PIXI.Graphics()
        },
        title = new PIXI.Text('发送请求 request', {
            fontSize: `${30 * PIXI.ratio}px`,
            fill: 0x999999,
            align: 'center'
        }),
        line = new PIXI.Graphics(),
        explain = new PIXI.Text('点击向服务器发起请求', {
            fontSize: `${30 * PIXI.ratio}px`,
            fill: 0x999999,
            align: 'center'
        }),
        button = new PIXI.Graphics(),
        text = new PIXI.Text('request', {
            fontSize: `${30 * PIXI.ratio}px`,
            fill: 0xffffff,
            align: 'center'
        });
    goBack.button.position.set(0, 52 * Math.ceil(PIXI.ratio));
    goBack.button
        .beginFill(0xffffff, 0)
        .drawRect(0, 0, 80 * PIXI.ratio, 80 * PIXI.ratio)
        .endFill();
    goBack.arrow
        .lineStyle(5 * PIXI.ratio, 0x333333)
        .moveTo(50 * PIXI.ratio, 20 * PIXI.ratio)
        .lineTo(30 * PIXI.ratio, 40 * PIXI.ratio)
        .lineTo(50 * PIXI.ratio, 60 * PIXI.ratio);

    title.position.set((obj.width - title.width) / 2, 180 * PIXI.ratio);

    line.beginFill(0x999999)
        .drawRect(0, 0, title.width, 1 * PIXI.ratio)
        .endFill();
    line.position.set((obj.width - title.width) / 2, title.y + title.height + 10 * PIXI.ratio);

    explain.position.set((obj.width - explain.width) / 2, line.y + line.height + 300 * PIXI.ratio);

    button.position.set(30 * PIXI.ratio, explain.y + explain.height + 300 * PIXI.ratio);
    button
        .beginFill(0x07c160, 1)
        .drawRoundedRect(0, 0, obj.width - button.x * 2, 80 * PIXI.ratio, 10 * PIXI.ratio)
        .endFill();

    button.addChild(text);
    text.position.set((button.width - text.width) / 2, (button.height - text.height) / 2);

    button.interactive = true;
    button.touchstart = e => {
        button.recordY = e.data.global.y;
    };
    button.touchend = e => {
        if (Math.abs(button.recordY - e.data.global.y) < 5) {
            callBack((res, time) => {
                explain.text = `数据包大小：${res.header['Content-Length']}B\n请求耗时：${Date.now() - time}ms`;
            });
        }
    };
    goBack.button.interactive = true;
    goBack.button.touchend = () => {
        window.router.goBack();
        explain.text = '点击向服务器发起请求';
    };

    goBack.button.addChild(goBack.arrow);
    container.addChild(goBack.button, title, line, explain, button);
    container.visible = false;
    app.stage.addChild(container);

    return container;
};