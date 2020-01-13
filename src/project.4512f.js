window.__require = function e(t, i, n) {
    function o(a, c) {
        if (!i[a]) {
            if (!t[a]) {
                var r = a.split("/");
                if (r = r[r.length - 1],
                !t[r]) {
                    var l = "function" == typeof __require && __require;
                    if (!c && l)
                        return l(r, !0);
                    if (s)
                        return s(r, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
            }
            var h = i[a] = {
                exports: {}
            };
            t[a][0].call(h.exports, function(e) {
                return o(t[a][1][e] || e)
            }, h, h.exports, e, t, i, n)
        }
        return i[a].exports
    }
    for (var s = "function" == typeof __require && __require, a = 0; a < n.length; a++)
        o(n[a]);
    return o
}({
    LabelLocalized: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e4f88adp3hERoJ48DZ2PSAl", "LabelLocalized");
        var n = e("i18n");
        cc.Class({
            extends: cc.Label,
            properties: {
                textKey: {
                    default: "TEXT_KEY",
                    multiline: !0,
                    tooltip: "Enter i18n key here",
                    notify: function() {
                        this._sgNode && (this._sgNode.setString(this.string),
                        this._updateNodeSize())
                    }
                },
                string: {
                    override: !0,
                    tooltip: "Here shows the localized string of Text Key",
                    get: function() {
                        return n.t(this.textKey)
                    },
                    set: function(e) {
                        this.textKey = e,
                        cc.warn("Please set label text key in Text Key property.")
                    }
                }
            }
        }),
        cc._RF.pop()
    }
    , {
        i18n: "i18n"
    }],
    LanguageData: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
        var n = e("polyglot.min")
          , o = null;
        function s(e) {
            return window.i18n.languages[e]
        }
        function a(e) {
            e && (o ? o.replace(e) : o = new n({
                phrases: e,
                allowMissing: !0
            }))
        }
        window.i18n || (window.i18n = {
            languages: {},
            curLang: ""
        }),
        t.exports = {
            init: function(e) {
                if (e !== window.i18n.curLang) {
                    var t = s(e) || {};
                    window.i18n.curLang = e,
                    a(t),
                    this.inst = o
                }
            },
            t: function(e, t) {
                if (o)
                    return o.t(e, t)
            },
            inst: o,
            updateSceneRenderers: function() {
                for (var e = cc.director.getScene().children, t = [], i = 0; i < e.length; ++i) {
                    var n = e[i].getComponentsInChildren("LocalizedLabel");
                    Array.prototype.push.apply(t, n)
                }
                for (var o = 0; o < t.length; ++o) {
                    var s = t[o];
                    s.node.active && s.updateLabel()
                }
                for (var a = [], c = 0; c < e.length; ++c) {
                    var r = e[c].getComponentsInChildren("LocalizedSprite");
                    Array.prototype.push.apply(a, r)
                }
                for (var l = 0; l < a.length; ++l) {
                    var h = a[l];
                    h.node.active && h.updateSprite(window.i18n.curLang)
                }
            }
        },
        cc._RF.pop()
    }
    , {
        "polyglot.min": "polyglot.min"
    }],
    LocalizedLabel: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
        var n = e("LanguageData");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                menu: "i18n/LocalizedLabel"
            },
            properties: {
                dataID: {
                    get: function() {
                        return this._dataID
                    },
                    set: function(e) {
                        this._dataID !== e && (this._dataID = e,
                        this.updateLabel())
                    }
                },
                _dataID: ""
            },
            onLoad: function() {
                n.inst || n.init(),
                this.fetchRender()
            },
            fetchRender: function() {
                var e = this.getComponent(cc.Label);
                if (e)
                    return this.label = e,
                    void this.updateLabel()
            },
            updateLabel: function() {
                this.label ? n.t(this.dataID) && (this.label.string = n.t(this.dataID)) : cc.error("Failed to update localized label, label component is invalid!")
            }
        }),
        cc._RF.pop()
    }
    , {
        LanguageData: "LanguageData"
    }],
    LocalizedSprite: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
        var n = e("SpriteFrameSet");
        cc.Class({
            extends: cc.Component,
            editor: {
                executeInEditMode: !0,
                inspector: "packages://i18n/inspector/localized-sprite.js",
                menu: "i18n/LocalizedSprite"
            },
            properties: {
                spriteFrameSet: {
                    default: [],
                    type: n
                }
            },
            onLoad: function() {
                this.fetchRender()
            },
            fetchRender: function() {
                var e = this.getComponent(cc.Sprite);
                if (e)
                    return this.sprite = e,
                    void this.updateSprite(window.i18n.curLang)
            },
            getSpriteFrameByLang: function(e) {
                for (var t = 0; t < this.spriteFrameSet.length; ++t)
                    if (this.spriteFrameSet[t].language === e)
                        return this.spriteFrameSet[t].spriteFrame
            },
            updateSprite: function(e) {
                if (this.sprite) {
                    var t = this.getSpriteFrameByLang(e);
                    !t && this.spriteFrameSet[0] && (t = this.spriteFrameSet[0].spriteFrame),
                    this.sprite.spriteFrame = t
                } else
                    cc.error("Failed to update localized sprite, sprite component is invalid!")
            }
        }),
        cc._RF.pop()
    }
    , {
        SpriteFrameSet: "SpriteFrameSet"
    }],
    SpriteFrameSet: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
        var n = cc.Class({
            name: "SpriteFrameSet",
            properties: {
                language: "",
                spriteFrame: cc.SpriteFrame
            }
        });
        t.exports = n,
        cc._RF.pop()
    }
    , {}],
    audio: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7cba3Mq9T1BB5gqhCb2Xcci", "audio");
        var n = cc.Class({
            name: "audio",
            ctor: function() {
                this.audio_url = "https://wxgame.088.com/jdqs/res/resources/public/audio/",
                this.open = 1;
                var e = parseInt(cc.sys.localStorage.getItem("isAudio"));
                1 != e && 0 != e || (this.open = e),
                this.sound = !0,
                this.filePath = "",
                this.wxauio = null,
                cc.sys.os === cc.sys.OS_IOS && (this.wxauio = wx.createInnerAudioContext())
            },
            play: function(e, t) {
                return cc.audioEngine.play(e, t, this.open && this.sound ? 1 : 0)
            },
            playMusic: function(e) {
                this.filePath = e,
                1 === this.open && cc.audioEngine.playMusic(e, !0)
            },
            getUrl: function(e) {
                console.log(" sudio :  " + e + "  : ");
                var t = e.split("/");
                return this.audio_url + t[t.length - 1]
            },
            playNative: function(e, t) {
                var i = this;
                gl.load(e, function(e, n, o) {
                    gl.audio.play(e, t, i.open && i.sound ? 1 : 0)
                })
            },
            clickPlay: function() {
                this.playNative("audio/click", !1)
            },
            pause: function() {},
            resume: function() {},
            stop: function(e) {
                cc.sys.os === cc.sys.OS_IOS ? e.destroy() : cc.audioEngine.stop(e)
            },
            stopMusic: function() {
                cc.sys.os === cc.sys.OS_IOS || cc.audioEngine.stopMusic()
            },
            setSound: function(e) {
                this.sound = e,
                console.log("this.sound", this.sound)
            },
            setOpen: function() {
                this.open ? this.open = 0 : this.open = 1,
                cc.sys.os === cc.sys.OS_IOS ? 1 == this.open ? this.wxauio.play() : this.wxauio.pause() : 1 == this.open ? cc.audioEngine.resumeMusic() : cc.audioEngine.pauseMusic(),
                cc.sys.localStorage.setItem("isAudio", this.open),
                this.filePath && this.open && this.playMusic(this.filePath, !0)
            },
            setGameOpen: function(e) {
                cc.sys.os === cc.sys.OS_IOS && this.wxauio ? e ? this.open && this.wxauio.play() : this.wxauio.pause() : e ? this.open && cc.audioEngine.resumeMusic() : cc.audioEngine.pauseMusic()
            }
        });
        t.exports = new n,
        cc._RF.pop()
    }
    , {}],
    bulletCtrl: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "305752ctkxNBay+wFMwmzEu", "bulletCtrl"),
        cc.Class({
            extends: cc.Component,
            properties: {
                bullet: cc.Prefab
            },
            onLoad: function() {
                gl.emitter.on("event_fireBullet", this.fireBullet, this)
            },
            fireBullet: function(e) {
                var t = gl.userinfo.get("shootCount");
                gl.userinfo.set("shootCount", t += 1);
                var i = cc.instantiate(this.bullet);
                i.parent = this.node,
                i.setPosition(e.pos);
                var n = Math.atan2(e.velocity.y, e.velocity.x);
                i.rotation = 180 * -n / Math.PI,
                i.getComponent(cc.RigidBody).linearVelocity = e.velocity
            },
            start: function() {},
            onDestroy: function() {
                gl.emitter.off("event_fireBullet", this)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    bullet: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f6804fDR3FINbzKRHJnCM9X", "bullet");
        var n = 0
          , o = 3
          , s = 4
          , a = 5
          , c = 6
          , r = 7
          , l = 8
          , h = 9
          , u = 10;
        cc.Class({
            extends: cc.Component,
            properties: {
                audio_list: [cc.AudioClip]
            },
            onLoad: function() {
                this.num = 0,
                this.isOver = !1,
                this.isCollide = !1,
                this.bulletBody = this.node.getComponent(cc.RigidBody),
                this.BODYTAG = gl.userinfo.get("BODYTAG"),
                this.PLAYERTAG = gl.userinfo.get("PLAYERTAG"),
                this.bulletSpeed = gl.userinfo.get("bulletSpeed"),
                gl.audio.play(this.audio_list[n], !1)
            },
            onBeginContact: function(e, t, i) {
                if (!this.isCollide)
                    switch (i.tag) {
                    case this.PLAYERTAG.HATS:
                        this.isCollide = !0,
                        0 !== gl.userinfo.shield ? (0 == --gl.userinfo.shield && gl.emitter.emit("event_offshield"),
                        this.hitTarget()) : i.node.getComponent(cc.WeldJoint) && i.node.getComponent(cc.WeldJoint).enabled && (i.node.getComponent(cc.WeldJoint).enabled = !1);
                        break;
                    case this.BODYTAG.PLAYER:
                        this.isCollide = !0,
                        0 !== gl.userinfo.shield ? 0 == --gl.userinfo.shield && gl.emitter.emit("event_offshield") : (i.node.children[0].active ? i.node.children[0].active = !1 : gl.emitter.emit("event_gameOver"),
                        gl.emitter.emit("event_hitBody", {
                            pos: i.node.position
                        }),
                        gl.audio.play(this.audio_list[l], !1)),
                        this.hitTarget();
                        break;
                    case this.BODYTAG.GLASS:
                        gl.emitter.emit("event_hitCup", {
                            pos: i.node.position,
                            tag: this.BODYTAG.GLASS
                        }),
                        i.node.destroy(),
                        this.node.destroy(),
                        gl.audio.play(this.audio_list[a], !1);
                        break;
                    case this.BODYTAG.BULEGLASS:
                    case this.BODYTAG.BULEGLASSBIG:
                        i.node.getComponent("goods_buleGlass").bulletHit(),
                        gl.emitter.emit("event_hitCup", {
                            pos: i.node.position,
                            tag: this.BODYTAG.BULEGLASS
                        }),
                        this.hitTarget(i.node),
                        gl.audio.play(this.audio_list[a], !1);
                        break;
                    case this.BODYTAG.LIGHT:
                        gl.emitter.emit("event_hitCup", {
                            pos: this.node.position,
                            tag: this.BODYTAG.GLASS
                        }),
                        this.hitTarget(i.node),
                        gl.audio.play(this.audio_list[s], !1);
                        break;
                    case this.BODYTAG.LIGHTCONNECT:
                        i.node.getComponent(cc.RevoluteJoint) && i.node.getComponent(cc.RevoluteJoint).enabled && (i.node.getComponent(cc.RevoluteJoint).enabled = !1),
                        this.hitTarget(null, !1),
                        gl.audio.play(this.audio_list[c], !1);
                        break;
                    case this.BODYTAG.TV:
                        if (1 == i.node.children[0].active)
                            return;
                        var n = i.node;
                        n.children[0].active = !0,
                        n.children[1].active = !1,
                        gl.audio.play(this.audio_list[u], !1),
                        this.hitTarget(),
                        gl.emitter.emit("event_blasting", {
                            uuid: n.uuid,
                            pos: n.position
                        }),
                        gl.audio.play(this.audio_list[l], !1);
                        break;
                    case this.BODYTAG.MOS:
                        gl.emitter.emit("event_hitBody", {
                            pos: i.node.position
                        }),
                        gl.emitter.emit("event_creatMos"),
                        this.hitTarget(i.node),
                        gl.audio.play(this.audio_list[r], !1);
                        break;
                    case this.BODYTAG.GAS:
                        i.node.getComponent("goods_bottleGas").startJet(),
                        this.hitTarget(null, !1),
                        gl.audio.play(this.audio_list[o], !1);
                        break;
                    case this.BODYTAG.BOARD:
                        gl.audio.play(this.audio_list[o], !1);
                        break;
                    case this.BODYTAG.WALL:
                        gl.audio.play(this.audio_list[h], !1);
                        break;
                    default:
                        gl.emitter.emit("event_spark", {
                            pos: this.node.position
                        })
                    }
            },
            hitTarget: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null
                  , t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                e && e && e.destroy(),
                t && this.node && this.node.destroy()
            },
            onEndContact: function(e, t, i) {
                this.isCollide = !1
            },
            start: function() {},
            update: function(e) {
                var t = this.bulletBody.linearVelocity;
                Math.sqrt(t.x * t.x + t.y * t.y) < this.bulletSpeed * (2 / 3) && (t.mulSelf(1.5),
                this.bulletBody.linearVelocity = t),
                this.radian = Math.atan2(t.y, t.x),
                this.node.rotation = 180 * -this.radian / Math.PI
            },
            onDestroy: function() {}
        }),
        cc._RF.pop()
    }
    , {}],
    chipCtrl: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "adf62yrLypEm4RH6BEQpjAa", "chipCtrl"),
        cc.Class({
            extends: cc.Component,
            properties: {
                effect_burst: cc.Prefab,
                effect_burst_blue: cc.Prefab,
                effect_blood: cc.Prefab,
                effect_fire: cc.Prefab,
                effect_spark: cc.Prefab,
                effect_openBottle: cc.Prefab
            },
            onLoad: function() {
                gl.emitter.on("event_hitCup", this.hitCup, this),
                gl.emitter.on("event_hitBody", this.hitBody, this),
                gl.emitter.on("event_fireBullet", this.fireBullet, this),
                gl.emitter.on("event_spark", this.spark, this),
                gl.emitter.on("event_openBottle", this.openBottl, this),
                this.BODYTAG = gl.userinfo.get("BODYTAG"),
                this.initPool()
            },
            initPool: function() {
                this.sparkPool = new cc.NodePool;
                for (var e = 0; e < 10; e++) {
                    var t = cc.instantiate(this.effect_spark);
                    this.sparkPool.put(t)
                }
            },
            spark: function(e) {
                var t = this
                  , i = this.getNodeFromPool();
                i.setPosition(e.pos),
                i.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function() {
                    t.sparkPool.put(i)
                })))
            },
            fireBullet: function(e) {
                var t = cc.instantiate(this.effect_fire);
                t.setPosition(e.pos),
                t.parent = this.node,
                t.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function() {
                    t.destroy()
                })))
            },
            hitBody: function(e) {
                var t = cc.instantiate(this.effect_blood);
                t.setPosition(e.pos),
                t.parent = this.node,
                t.runAction(cc.sequence(cc.delayTime(5), cc.callFunc(function() {
                    t.destroy()
                })))
            },
            hitCup: function(e) {
                var t = void 0;
                switch (e.tag) {
                case this.BODYTAG.GLASS:
                    t = cc.instantiate(this.effect_burst);
                    break;
                case this.BODYTAG.BULEGLASS:
                    t = cc.instantiate(this.effect_burst_blue)
                }
                t && (t.setPosition(e.pos),
                t.parent = this.node)
            },
            openBottl: function(e) {
                var t = cc.instantiate(this.effect_openBottle);
                t.setPosition(e.pos),
                t.parent = this.node,
                t.runAction(cc.sequence(cc.delayTime(1), cc.callFunc(function() {
                    t.destroy()
                })))
            },
            getNodeFromPool: function() {
                var e = null;
                return (e = this.sparkPool.size() > 0 ? this.sparkPool.get() : cc.instantiate(this.effect_spark)).parent = this.node,
                e
            },
            start: function() {},
            onDestroy: function() {
                this.sparkPool.clear(),
                gl.emitter.off("event_hitCup", this),
                gl.emitter.off("event_hitBody", this),
                gl.emitter.off("event_fireBullet", this),
                gl.emitter.off("event_spark", this),
                gl.emitter.off("event_openBottle", this)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    emitter: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "69ad01Dgy9H+Zn3G/Vc25DV", "emitter");
        var n = cc.Class({
            name: "emitter",
            properties: {},
            ctor: function() {
                this.event_list = []
            },
            on: function(e, t, i) {
                e && t && i && this.event_list.push({
                    eventName: e,
                    cb: t,
                    target: i
                })
            },
            emit: function(e, t) {
                for (var i = 0; i < this.event_list.length; i++)
                    this.event_list[i].eventName == e && this.event_list[i].cb.call(this.event_list[i].target, t)
            },
            off: function(e, t) {
                for (var i = this.event_list.length - 1; i >= 0; i--)
                    this.event_list[i].eventName == e && this.event_list[i].target == t && this.event_list.splice(i, 1)
            },
            emitOnce: function(e, t) {
                for (var i = this.event_list.length - 1; i >= 0; i--)
                    if (this.event_list[i].eventName == e)
                        return void this.event_list[i].cb.call(this.event_list[i].target, t)
            }
        });
        t.exports = new n,
        cc._RF.pop()
    }
    , {}],
    en: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "920c5VLzJxKjYCAoIUwUHym", "en"),
        t.exports = {},
        cc._RF.pop()
    }
    , {}],
    fluid: [function(e, t, i) {
        "use strict";
        function n(e, t, i) {
            return (t.x - e.x) * (i.y - e.y) > (t.y - e.y) * (i.x - e.x)
        }
        function o(e, t, i, n) {
            var o = cc.v2(e.x - t.x, e.y - t.y)
              , s = cc.v2(i.x - n.x, i.y - n.y)
              , a = e.x * t.y - e.y * t.x
              , c = i.x * n.y - i.y * n.x
              , r = o.x * s.y - o.y * s.x;
            return cc.v2((a * s.x - c * o.x) / r, (a * s.y - c * o.y) / r)
        }
        function s(e) {
            for (var t = e.length, i = cc.v2(0, 0), n = 0, o = 0; o < t; ++o) {
                var s = e[o]
                  , a = o + 1 < t ? e[o + 1] : e[0]
                  , c = s.x - 0
                  , r = s.y - 0
                  , l = a.x - 0
                  , h = .5 * (c * (a.y - 0) - r * l);
                n += h,
                i.x += h * (1 / 3) * (0 + s.x + a.x),
                i.y += h * (1 / 3) * (0 + s.y + a.y)
            }
            return [n, i]
        }
        cc._RF.push(t, "4fac2fSnGxDOruv0jMb5Reu", "fluid"),
        cc.Class({
            extends: cc.Component,
            properties: {
                density: 1,
                angularDrag: 1,
                linearDrag: 1
            },
            onLoad: function() {
                this.createFluid(),
                this.inFluid = [],
                this.gravity = cc.v2(0, 20)
            },
            findIntersectionAreaAndCentroid: function(e) {
                var t = e.GetFixtureList();
                if (t && 2 === t.GetType()) {
                    for (var i = cc.v2(0, 0), a = 0, c = 0; t; ) {
                        for (var r = this.getVertices(this.fluidBody), l = this.getVertices(e), h = l[l.length - 1], u = 0; u < l.length; u++) {
                            var d = l[u]
                              , g = r;
                            r = [];
                            for (var f = g[g.length - 1], p = 0; p < g.length; p++) {
                                var m = g[p];
                                n(h, d, m) ? (n(h, d, f) || r.push(o(h, d, f, m)),
                                r.push(m)) : n(h, d, f) && r.push(o(h, d, f, m)),
                                f = m
                            }
                            h = d
                        }
                        var _ = s(r)
                          , b = t.GetDensity();
                        c += _[0] * b,
                        a += _[0],
                        i.x += _[1].x * b,
                        i.y += _[1].y * b,
                        t = t.GetNext()
                    }
                    return i.mulSelf(1 / c),
                    [a, i]
                }
            },
            createFluid: function() {
                var e = this.node.addComponent(cc.RigidBody);
                e.type = 0,
                e.enabledContactListener = !0;
                var t = this.node.addComponent(cc.PhysicsPolygonCollider)
                  , i = this.node.width / 2
                  , n = this.node.height / 2;
                t.points = [cc.v2(-i, -n), cc.v2(i, -n), cc.v2(i, n), cc.v2(-i, n)],
                t.sensor = !0,
                t.density = this.density,
                t.apply(),
                this.fluidBody = e._b2Body
            },
            onBeginContact: function(e, t, i) {
                var n = i.body._b2Body;
                this.inFluid.push(n),
                e.disabled = !0
            },
            onEndContact: function(e, t, i) {
                var n = i.body._b2Body
                  , o = this.inFluid.indexOf(n);
                this.inFluid.splice(o, 1),
                e.disabled = !0
            },
            applyBuoyancy: function(e) {
                var t = this.findIntersectionAreaAndCentroid(e);
                if (0 !== t[0]) {
                    var i = t[0] * this.density
                      , n = t[1]
                      , o = new b2.Vec2(i * this.gravity.x,i * this.gravity.y);
                    e.ApplyForce(o, n);
                    var s = e.GetLinearVelocityFromWorldPoint(n).Subtract(this.fluidBody.GetLinearVelocityFromWorldPoint(n))
                      , a = this.density * this.linearDrag * i
                      , c = s.Multiply(-a);
                    e.ApplyForce(c, n);
                    var r = -e.GetInertia() / e.GetMass() * i * e.GetAngularVelocity() * this.angularDrag;
                    e.ApplyTorque(r)
                }
            },
            getVertices: function(e) {
                for (var t = e.GetFixtureList().GetShape(), i = [], n = 0; n < t.GetVertexCount(); n++)
                    i.push(e.GetWorldPoint(t.GetVertex(n)));
                return i
            },
            update: function(e) {
                for (var t = 0, i = this.inFluid.length; t < i; t++)
                    this.applyBuoyancy(this.inFluid[t])
            }
        }),
        cc._RF.pop()
    }
    , {}],
    game: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "dfb13XJV49L0ZkUGicCGwGL", "game"),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_time: cc.Label,
                goods_mos: cc.Prefab,
                prefab_overMenu: cc.Prefab,
                prefab_flaunt: cc.Prefab,
                prefab_winPanel: cc.Prefab,
                prefab_pauseMenu: cc.Prefab,
                prefab_hintFrame: cc.Prefab,
                prefab_lookRank: cc.Prefab,
                prefab_switchRole: cc.Prefab,
                prefab_guidancePass: cc.Prefab,
                pre_treasure: cc.Prefab,
                node_world: cc.Node,
                node_guidance: [cc.Node],
                audio_bg: cc.AudioClip,
                auido_win: cc.AudioClip,
                auido_fail: cc.AudioClip,
                goods: [cc.Prefab],
                tv_fire: cc.Prefab,
                aroundWall: cc.Node,
                lab_pointNum: cc.Label,
                starShow: cc.Node
            },
            onLoad: function() {
                this.goodsList = {},
                this.timer = null,
                this.gameTime = 0,
                this.useTime = 0,
                this.isWin = !0,
                this.isOver = !1,
                this.paseMenu = null,
                this.overMenu = null,
                this.winPanel = null,
                this.node_tvfire = null,
                this.starLevel = 3,
                this.lab_pointNum.string = "\u7b2c" + (gl.userinfo.checkPoint + 1) + "\u5173",
                gl.emitter.on("event_creatMos", this.creatMos, this),
                gl.emitter.on("event_gameOver", this.gameOver, this),
                gl.emitter.on("event_gameWin", this.gameWin, this),
                gl.emitter.on("event_nostamina", this.noStamina, this),
                gl.emitter.on("event_oplookRank", this.lookRank, this),
                gl.emitter.on("event_opswitchRole", this.switchRole, this),
                gl.emitter.on("event_gamecontinue", this.startTimeOut, this),
                gl.emitter.on("event_gamesenter", this.gamesenter, this),
                gl.emitter.on("event_gamesopne", this.gamesopne, this),
                gl.emitter.on("event_blasting", this.Blasting, this),
                gl.emitter.on("event_guidanceStateChange", this.guidanceStateChange, this),
                gl.audio.playMusic(this.audio_bg),
                this.initDataGoods(),
                gl.wechat.hideGameClub(),
                this.startPhysic(),
                gl.userinfo.initData(),
                this.initPyhsicWorle(),
                this.showGudianceState(),
                this.initWnd()
            },
            showGudianceState: function() {
                var e = this;
                0 == gl.userinfo.checkPoint && (this.node_guidance[4].active = !0,
                this.node_guidance[5].active = !0,
                this.node_guidance[5].runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function() {
                    e.btn_startGuidance()
                }))))
            },
            btn_startGuidance: function() {
                this.node_guidance[5].stopAllActions(),
                this.node_guidance[5].active = !1,
                this.guidanceStateChange(0)
            },
            guidanceStateChange: function(e) {
                var t = this;
                switch (console.log(e),
                gl.userinfo.set("guidanceState", e),
                this.node_guidance[0].active = !1,
                this.node_guidance[1].active = !1,
                this.node_guidance[2].active = !1,
                this.node_guidance[3].active = !1,
                this.node_guidance[4].active = !0,
                e) {
                case 0:
                    this.node_guidance[0].active = !0;
                    break;
                case 1:
                    this.node_guidance[0].getChildByName("tip").getChildByName("tiplab").getComponent(cc.Label).string = "\u677e\u5f00\u624b\u6307\u5c04\u51fa\u5b50\u5f39",
                    this.node_guidance[0].active = !0;
                    break;
                case 2:
                    this.node_guidance[1].active = !0,
                    this.node_guidance[1].getChildByName("tip").getChildByName("tiplab").getComponent(cc.Label).string = "\u677e\u5f00\u624b\u6307\u5c04\u51fa\u5b50\u5f39";
                    break;
                case 3:
                    this.node_guidance[2].active = !0,
                    this.node_guidance[2].runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {
                        t.node_guidance[1].active = !0,
                        t.node_guidance[2].active = !1
                    })));
                    break;
                case 4:
                    this.node_guidance[4].active = !1,
                    gl.userinfo.set("guidanceState", 5)
                }
            },
            initWnd: function() {
                this.creatMos(),
                this.startTimeOut()
            },
            gamesopne: function(e) {
                cc.director.getPhysicsManager().enabled = e,
                e ? this.node.resumeAllActions() : this.node.pauseAllActions(),
                e ? this.timer || this.startTimeOut() : this.timer && this.cleanTimeOut()
            },
            startPhysic: function() {
                cc.director.getPhysicsManager().enabled = !0
            },
            initDataGoods: function() {
                for (var e = 0; e < this.goods.length; e++)
                    this.goodsList[this.goods[e].data.name] || (this.goodsList[this.goods[e].data.name] = null),
                    this.goodsList[this.goods[e].data.name] = this.goods[e].data
            },
            initPyhsicWorle: function() {
                this.levelarr = gl.levelArr;
                for (var e = gl.userinfo.get("checkPoint"), t = this.levelarr[e].itemArr, i = 0, n = 0; n < t.length; n++) {
                    var o = t[n].type;
                    if ("role" != o) {
                        var s = cc.instantiate(this.goodsList[o]);
                        s.x = t[n].x,
                        s.y = t[n].y,
                        s.rotation = t[n].rotation,
                        s.width = t[n].width,
                        s.height = t[n].height,
                        "buleGlassBig" != o && "buleGlass" != o || i++;
                        var a = void 0;
                        "fan" != o && "buleGlass" != o && "bottleGas" != o && "light" != o && "buleGlassBig" != o && "tv" != o ? ((a = s.getComponent(cc.PhysicsBoxCollider)).size.width = t[n].width,
                        a.size.height = t[n].height,
                        s.parent = this.node_world) : s.parent = this.node_world
                    } else {
                        var c = cc.v2(t[n].x, t[n].y);
                        gl.userinfo.set("playerPos", c)
                    }
                }
                gl.userinfo.set("blueCount", i)
            },
            creatMos: function() {
                var e = this;
                this.isOver || gl.userinfo.get("checkPoint") < 5 || (this.mosNode = null,
                this.node.runAction(cc.sequence(cc.delayTime(2), cc.callFunc(function() {
                    e.mosNode = cc.instantiate(e.goods_mos),
                    e.mosNode.parent = e.node
                }))))
            },
            creatTreasure: function() {
                if (gl.userinfo.wechatflag) {
                    if (gl.userinfo.checkPoint < 9)
                        return;
                    this.Treasure = cc.instantiate(this.pre_treasure),
                    this.Treasure.parent = this.node
                }
            },
            gameOver: function() {
                this.isOver || (this.cleanTimeOut(),
                this.isOver = !0,
                this.isWin = !1,
                gl.userinfo.set("isWin", !1),
                this.mosNode && this.mosNode.destroy(),
                this.node.stopAllActions(),
                this.showOverMenu(),
                gl.audio.play(this.auido_fail, !1))
            },
            gameWin: function() {
                if (!this.isOver && this.isWin) {
                    this.cleanTimeOut(),
                    gl.userinfo.set("time", this.gameTime),
                    this.isOver = !0,
                    gl.userinfo.set("isWin", !0),
                    this.mosNode && this.mosNode.destroy(),
                    this.node.stopAllActions(),
                    this.storagePoint(),
                    this.showOverMenu(),
                    gl.audio.play(this.auido_win, !1);
                    var e = this.gameTime;
                    console.log("pointtime:", e),
                    gl.userinfo.reqPointSubmit(gl.userinfo.get("checkPoint"), e)
                }
            },
            noStamina: function() {
                cc.instantiate(this.prefab_hintFrame).parent = cc.director.getScene()
            },
            lookRank: function() {
                var e = cc.instantiate(this.prefab_lookRank);
                e.parent = this.node
            },
            switchRole: function() {
                var e = cc.instantiate(this.prefab_switchRole);
                e.parent = this.node,
                roleNode.getComponent("prefab_selectRole").isInGame()
            },
            goEditor: function() {
                cc.director.loadScene("editor")
            },
            storagePoint: function() {
                var e = gl.userinfo.get("pointCount")
                  , t = Number(gl.userinfo.get("hadPass"))
                  , i = gl.userinfo.get("checkPoint");
                t <= e && i == t && (t += 1,
                gl.userinfo.set("hadPass", t))
            },
            gamesenter: function() {
                this.cleanTimeOut(),
                new Promise(function(e, t) {
                    cc.director.preloadScene("game", function(t, i) {
                        if (!t)
                            return e();
                        console.error(t)
                    })
                }
                ).then(function() {
                    cc.director.resume(),
                    cc.director.loadScene("game")
                })
            },
            startTimeOut: function() {
                var e = this;
                this.timer || (this.timer = setInterval(function() {
                    e.gameTime += 1,
                    20 == e.gameTime && e.creatTreasure(),
                    gl.userinfo.gameTime = e.gameTime,
                    e.node_time.string = gl.userinfo.getStrTime(e.gameTime),
                    e.starCtrl()
                }, 1e3))
            },
            starCtrl: function() {
                var e = gl.userinfo.starCondition;
                1 != this.starLevel && this.gameTime > e.lev2 ? (this.starLevel = 1,
                this.starShow.children[1].children[0].runAction(cc.sequence(cc.moveBy(.2, cc.v2(0, 40)), cc.spawn(cc.moveBy(.3, cc.v2(0, -100)), cc.fadeTo(.3, 0))))) : 2 != this.starLevel && 1 != this.starLevel && this.gameTime > e.lev1 && (this.starLevel = 2,
                this.starShow.children[2].children[0].runAction(cc.sequence(cc.moveBy(.2, cc.v2(0, 40)), cc.spawn(cc.moveBy(.3, cc.v2(0, -100)), cc.fadeTo(.3, 0)))))
            },
            cleanTimeOut: function() {
                this.timer && (clearTimeout(this.timer),
                this.timer = null)
            },
            showOverMenu: function() {
                var e = this;
                this.Treasure && this.Treasure.destroy(),
                this.node.runAction(cc.sequence(cc.delayTime(3), cc.callFunc(function() {
                    (e.gamesopne(!1),
                    e.isWin = gl.userinfo.get("isWin"),
                    e.paseMenu && e.paseMenu.destroy(),
                    e.isWin) ? 0 == gl.userinfo.get("checkPoint") ? cc.instantiate(e.prefab_guidancePass).parent = e.node : (e.winPanel = cc.instantiate(e.prefab_winPanel),
                    e.winPanel.parent = e.node,
                    e.winPanel.getComponent("prefab_winPanel").initPanel(e.gameTime, e.starLevel, gl.userinfo.get("checkPoint"))) : (e.overMenu = cc.instantiate(e.prefab_overMenu),
                    e.overMenu.parent = e.node)
                })))
            },
            btn_pause: function() {
                gl.userinfo.set("gametime", this.gameTime),
                this.cleanTimeOut(),
                this.paseMenu = cc.instantiate(this.prefab_pauseMenu),
                this.paseMenu.parent = this.node,
                gl.emitter.emit("event_pauseGame"),
                gl.audio.clickPlay()
            },
            stopTvFire: function() {
                this.node_tvfire && this.node_tvfire.destroy()
            },
            Blasting: function(e) {
                for (var t = this, i = 0, n = this.node_world.childrenCount; i < n; i++) {
                    var o = this.node_world.children[i];
                    if (o.uuid !== e.uuid) {
                        var s = this.getNodeRigidBody(o);
                        if (s) {
                            var a = 500 * (s.node.x - e.pos.x)
                              , c = 500 * (s.node.y - e.pos.y);
                            s && s.applyForceToCenter(cc.v2(a, c), !0)
                        }
                    } else
                        o && o.runAction(cc.moveBy(.5, cc.v2(0, 200)))
                }
                this.node_tvfire = cc.instantiate(this.tv_fire),
                this.node_tvfire.position = e.pos,
                this.node_tvfire.parent = this.node_world;
                var r = cc.delayTime(1)
                  , l = cc.callFunc(function() {
                    t.stopTvFire()
                });
                this.node_tvfire.runAction(cc.sequence(r, l))
            },
            getNodeRigidBody: function(e) {
                var t = null;
                switch (e.name) {
                case "tv":
                case "bottleGas":
                case "glass":
                case "buleGlass":
                case "buleGlassBig":
                    t = e.getComponent(cc.RigidBody);
                    break;
                case "light":
                    t = e.getChildByName("light_zhao").getComponent(cc.RigidBody);
                    break;
                default:
                    console.log(" node.name.split :  " + e.name + "  : "),
                    "Board" == e.name.split("_")[0] && (t = e.getComponent(cc.RigidBody))
                }
                return t
            },
            start: function() {},
            onDestroy: function() {
                this.cleanTimeOut(),
                this.node.stopAllActions(),
                gl.emitter.off("event_creatMos", this),
                gl.emitter.off("event_gameOver", this),
                gl.emitter.off("event_gameWin", this),
                gl.emitter.off("event_nostamina", this),
                gl.emitter.off("event_oplookRank", this),
                gl.emitter.off("event_opswitchRole", this),
                gl.emitter.off("event_gamecontinue", this),
                gl.emitter.off("event_gamesenter", this),
                gl.emitter.off("event_gamesopne", this),
                gl.emitter.off("event_blasting", this),
                gl.emitter.off("event_guidanceStateChange", this),
                cc.director.getPhysicsManager().enabled = !1,
                gl.audio.stopMusic()
            }
        }),
        cc._RF.pop()
    }
    , {}],
    global: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9d2c01KfTtKIbbNx7cy4sq0", "global"),
        window.gl = window.gl || {},
        gl.bottom_color = [cc.color(145, 224, 234), cc.color(245, 193, 208), cc.color(223, 195, 232)],
        gl.light_color = [cc.color(64, 168, 181), cc.color(242, 154, 178), cc.color(204, 157, 218)],
        gl.button_color = [cc.color(64, 168, 181), cc.color(242, 154, 178), cc.color(204, 157, 218)],
        gl.color_index = 0,
        gl.MESSAGE_TYPE = {},
        gl.MESSAGE_TYPE.CLOSE_RANK = 0,
        gl.MESSAGE_TYPE.GAIN_RANK = 1,
        gl.MESSAGE_TYPE.GAIN_CLUB = 2,
        gl.MESSAGE_TYPE.SUBMIT_RANK = 3,
        gl.MESSAGE_TYPE.RANK_PAGE = 4,
        gl.MESSAGE_TYPE.CROWD_RANK = 5,
        gl.MESSAGE_TYPE.HIDE_RANK = 6,
        gl.MESSAGE_TYPE.SHOW_RANK = 7,
        gl.SHARE_TITLE = "\u4fe1\u4e0d\u4fe1\u4f60\u538b\u67aa\u6280\u672f\u518d\u597d\uff0c\u4e5f\u538b\u4e0d\u4f4f\u8fd9\u628a\u67aa\uff1f",
        gl.SHARE_PICURL = "https://wxgame.088.com/jdqs/res/resources/public/picture/img_share.png",
        cc.game.setFrameRate(60),
        gl.wechat_rank_key = "imageJump",
        gl.role_key = "role_index",
        gl.loading_jh = "prefab_await",
        gl.tip = "prefab_tip",
        gl.blLoading = !0,
        gl.blAddLoading = !1,
        gl.levelArr = null,
        gl.audio = e("audio"),
        gl.emitter = e("emitter"),
        gl.userinfo = e("userinfo"),
        gl.userinfo.onLoad(),
        gl.network = e("network"),
        gl.wechat = e("wechat"),
        gl.wechat.onLoad(),
        gl.i18n = e("i18n"),
        gl.horseRace = {
            count: 0,
            contentIndex: 0,
            horseIndex: 0
        },
        gl.backCb = null,
        gl.failCb = null,
        gl.failVideo = null,
        gl.backTime = null,
        gl.returnTime = null,
        gl.bannerSize = [],
        gl.bannerIndex = 0,
        cc.game.on(cc.game.EVENT_HIDE, function() {
            gl.backTime = null,
            gl.returnTime = null,
            gl.backTime = Math.round(new Date / 1e3),
            console.log("\u5207\u5230\u540e\u53f0"),
            gl.audio.setGameOpen(!1)
        }),
        cc.game.on(cc.game.EVENT_SHOW, function() {
            gl.returnTime = Math.round(new Date / 1e3);
            var e = gl.returnTime - gl.backTime;
            console.log("\u8fd4\u56de\u524d\u53f0,\u65f6\u95f4:", e),
            e > 3 ? gl.backCb && gl.backCb() : gl.failCb && gl.failCb(),
            gl.backCb = null,
            gl.failCb = null,
            gl.audio.setGameOpen(!0)
        }),
        gl.userinfo.isDevelop || (console.log = function() {}
        ,
        console.error = function() {}
        ,
        cc.log = function() {}
        ,
        cc.error = function() {}
        ),
        gl.showRemoteImage = function(e, t) {}
        ,
        gl.load = function(e, t) {
            cc.loader.loadRes(e, function(i, n) {
                if (i)
                    return cc.error("no find = " + e);
                t(n)
            })
        }
        ,
        gl.showJuHua = function() {
            var e = function() {
                var e = cc.director.getScene().getChildByName(gl.loading_jh);
                return e.active = !0,
                e.getComponent(e.name).startAction(),
                gl.blLoading || gl.closeJuHua(),
                e
            };
            return new Promise(function(t, i) {
                if (cc.director.getScene().getChildByName(gl.loading_jh))
                    t(e());
                else {
                    if (gl.blAddLoading)
                        return void (gl.blLoading = !0);
                    gl.blAddLoading = !0,
                    cc.loader.loadRes("prefab/prefab_await", cc.Prefab, function(n, o) {
                        if (n)
                            return console.error("prefab/prefab_await.prefab \u6587\u4ef6\u8bfb\u53d6\u5931\u8d25"),
                            i(n);
                        var s = cc.director.getScene()
                          , a = cc.instantiate(o);
                        s.addChild(a, 1e3),
                        t(e())
                    })
                }
            }
            )
        }
        ,
        gl.closeJuHua = function() {
            var e = cc.director.getScene().getChildByName(gl.loading_jh);
            e ? (e.getComponent(e.name).pauseAction(),
            e.active = !1,
            gl.blLoading = !0) : gl.blLoading = !1
        }
        ,
        gl.showTip = function(e) {
            var t = function(e, t) {
                return e.getComponent(e.name).showTip(t),
                e
            };
            return new Promise(function(i, n) {
                cc.loader.loadRes("prefab/" + gl.tip, cc.Prefab, function(o, s) {
                    if (o)
                        return console.error("prefab/" + gl.tip + ".prefab \u6587\u4ef6\u8bfb\u53d6\u5931\u8d25"),
                        n(o);
                    var a = cc.director.getScene()
                      , c = cc.instantiate(s);
                    a.addChild(c, 99),
                    i(t(c, e))
                })
            }
            )
        }
        ,
        gl.readJSON = function(e) {
            return new Promise(function(t, i) {
                cc.loader.loadRes(e, function(n, o) {
                    if (n)
                        return console.error(e + ".json \u6587\u4ef6\u8bfb\u53d6\u5931\u8d25"),
                        i(n);
                    console.log("\u8bfb\u53d6json\u6587\u4ef6 " + e + ".json: ", o.json),
                    t(o.json)
                })
            }
            )
        }
        ,
        cc._RF.pop()
    }
    , {
        audio: "audio",
        emitter: "emitter",
        i18n: "i18n",
        network: "network",
        userinfo: "userinfo",
        wechat: "wechat"
    }],
    goods_bottleGas: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7a6b5Yd/X5Oso/k40BQOnoy", "goods_bottleGas"),
        cc.Class({
            extends: cc.Component,
            properties: {
                effect_fire: cc.Prefab,
                audio_fiv: cc.AudioClip,
                audio_light: cc.AudioClip
            },
            onLoad: function() {
                this.isJet = !1,
                this.isFirst = !0,
                this.BODYTAG = gl.userinfo.get("BODYTAG"),
                this.speed = gl.userinfo.get("gasSpeed"),
                this.audioID = -1
            },
            startJet: function() {
                var e = this;
                if (this.isFirst) {
                    var t = [];
                    t.push(cc.callFunc(function() {
                        e.updateVelocity(),
                        e.isFirst = !1,
                        e.isJet = !0,
                        e.audioID = gl.audio.play(e.audio_fiv, !0)
                    }));
                    for (var i = 0; i < 5; i++)
                        t.push(cc.delayTime(.6), cc.callFunc(function() {
                            e.updateVelocity()
                        }));
                    t.push(cc.delayTime(.5), cc.callFunc(function() {
                        -1 != e.audioID && (gl.audio.stop(e.audioID),
                        e.audioID = -1),
                        e.updateVelocity(),
                        e.isJet = !1
                    })),
                    this.node.runAction(cc.sequence(t))
                }
            },
            updateVelocity: function() {
                var e = this.node.getChildByName("top").convertToWorldSpaceAR(this.node.getChildByName("top").position)
                  , t = this.node.getChildByName("bottom").convertToWorldSpaceAR(this.node.getChildByName("top").position)
                  , i = t.x - e.x
                  , n = t.y - e.y
                  , o = i / 260 * this.speed
                  , s = n / 260 * this.speed;
                this.velocity = cc.v2(o, s);
                var a = cc.instantiate(this.effect_fire)
                  , c = cc.v2(0, -this.node.height / 2);
                a.setPosition(c),
                a.parent = this.node,
                a.runAction(cc.sequence(cc.delayTime(.2), cc.callFunc(function() {
                    a.destroy()
                })))
            },
            start: function() {},
            onBeginContact: function(e, t, i) {
                switch (i.tag) {
                case this.BODYTAG.LIGHTCONNECT:
                    console.log("BODYTAG.LIGHTCONNECT"),
                    i.node.getComponent(cc.RevoluteJoint) && i.node.getComponent(cc.RevoluteJoint).enabled && (i.node.getComponent(cc.RevoluteJoint).enabled = !1),
                    gl.audio.play(this.audio_light, !1)
                }
            },
            onEndContact: function(e, t, i) {},
            onDestroy: function() {
                -1 != this.audioID && gl.audio.stop(this.audioID)
            },
            update: function(e) {
                this.isJet && (this.node.getComponent(cc.RigidBody).linearVelocity = this.velocity)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    goods_buleGlass: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5c3e1IyNAxP85uwCnQBUNTe", "goods_buleGlass"),
        cc.Class({
            extends: cc.Component,
            properties: {
                breakAudio: cc.AudioClip
            },
            onLoad: function() {
                gl.emitter.on("eventOnce_bottleBreak", this.breakBottle, this),
                this.isHit = !1,
                this.BODYTAG = gl.userinfo.get("BODYTAG")
            },
            bulletHit: function() {
                this.isHit = !0
            },
            breakBottle: function() {
                if (!this.node)
                    return console.log("\u74f6\u5b50\u5df2\u9500\u6bc1");
                this.isHit = !0,
                gl.emitter.emit("event_hitCup", {
                    pos: this.node.position,
                    tag: this.BODYTAG.BULEGLASS
                }),
                gl.emitter.emit("event_openBottle", {
                    pos: this.node.position
                }),
                gl.audio.play(this.breakAudio, !1),
                this.node && this.node.destroy()
            },
            onDestroy: function() {
                if (gl.emitter.off("eventOnce_bottleBreak", this),
                this.isHit) {
                    var e = gl.userinfo.get("sorce");
                    gl.userinfo.set("sorce", ++e);
                    var t = gl.userinfo.get("blueCount");
                    gl.userinfo.get("sorce") === t && gl.emitter.emit("event_gameWin")
                }
            }
        }),
        cc._RF.pop()
    }
    , {}],
    i18n: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "93789C/shtIL6entYsZPjee", "i18n");
        var n = e("polyglot")
          , o = cc.sys.language;
        "zh" !== o && (o = "en");
        var s = e(o)
          , a = new n({
            phrases: s,
            allowMissing: !0
        });
        t.exports = {
            init: function(t) {
                s = e(o = t),
                a.replace(s)
            },
            t: function(e, t) {
                return a.t(e, t)
            }
        },
        cc._RF.pop()
    }
    , {
        polyglot: "polyglot"
    }],
    mos: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e82d8AUAB9DVpq+uolmzJLS", "mos"),
        cc.Class({
            extends: cc.Component,
            properties: {
                audio_fly: cc.AudioClip
            },
            onLoad: function() {
                gl.emitter.on("event_gamesopne", this.gamesopne, this),
                this.sceneSize = cc.director.getWinSize(),
                this.node.setPosition(this.randomPos()[2]),
                this.startAction(),
                this.flyid = gl.audio.play(this.audio_fly, !0)
            },
            gamesopne: function(e) {
                e ? (this.node.resumeAllActions(),
                this.flyid && cc.audioEngine.resume(this.flyid)) : (this.node.pauseAllActions(),
                this.flyid && cc.audioEngine.pause(this.flyid))
            },
            startAction: function() {
                var e = this;
                this.node.stopAllActions();
                var t = this.randomPos();
                this.node.runAction(cc.sequence(cc.delayTime(1), cc.bezierTo(8, t), cc.callFunc(function() {
                    e.startAction()
                })))
            },
            randomPos: function() {
                var e = 1280 * Math.random() - 640
                  , t = 720 * Math.random() - 360;
                return e = e > 0 ? e -= this.node.width : e += this.node.width,
                t = t > 0 ? t -= this.node.height : t += 200,
                [cc.v2(0, 360), cc.v2(300, -640), cc.v2(e, t)]
            },
            start: function() {},
            update: function(e) {},
            onDestroy: function() {
                gl.emitter.off("event_gamesopne", this),
                this.node.stopAllActions(),
                this.flyid && gl.audio.stop(this.flyid)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    network: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9003b7BXJ1IXY/USQim0Gmo", "network");
        var n = e("sha1")
          , o = cc.Class({
            name: "network",
            ctor: function() {
                this.code = "jdqs",
                this.token = "",
                this.http_ip = "http://192.168.30.112:9504",
                this.sha1list = ["token:", "uid:", "key:", "data:"],
                this.netList = [],
                this.exit_count = 0
            },
            POST: function(e, t) {
                e.head.token = this.token
            },
            wechatPost: function(e, t) {},
            setToken: function(e) {
                this.token = e
            },
            closeNetList: function() {
                this.netList.splice(0, 1)
            },
            repeatNet: function() {
                if (this.netList && this.netList[0]) {
                    var e = this.netList[0];
                    this.wechatPost(e.data, e.call)
                }
            },
            bolOneNet: function(e) {
                var t = this.netList[0];
                if (t && t.data && t.data.head.route == e)
                    return !0;
                return !1
            },
            bolNetList: function(e) {
                for (var t = 0, i = this.netList.length; t < i; t++) {
                    if (e === this.netList[t].data.head.route)
                        return !1
                }
                return !0
            },
            send: function(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null
                  , n = {};
                n.head = {
                    uid: gl.userinfo.get("userid")
                },
                n.head.route = e,
                n.body = t,
                this.netList[0] ? this.bolNetList(e) && this.netList.push({
                    data: n,
                    call: i
                }) : (this.netList.push({
                    data: n,
                    call: i
                }),
                this.wechatPost(n, i))
            },
            encryption: function(e) {
                var t = e.head
                  , i = JSON.stringify(e.body)
                  , o = "" + this.sha1list[0] + t.token + "&" + this.sha1list[1] + t.uid + "&" + this.sha1list[2] + this.code + "&" + this.sha1list[3] + i;
                return e.head.mi = n.hex_hmac_sha1(this.code, o).slice(5),
                console.log("mi mw:", o),
                console.log(""),
                console.log("post", e),
                JSON.stringify(e)
            },
            decode: function(e) {
                var t = e.head
                  , i = JSON.stringify(e.body)
                  , o = "" + this.sha1list[0] + t.token + "&" + this.sha1list[1] + t.uid + "&" + this.sha1list[2] + this.code + "&" + this.sha1list[3] + i
                  , s = n.hex_hmac_sha1(this.code, o).slice(5);
                return e.head.mi == s
            },
            codeerror: function(e) {
                var t = "";
                switch (e) {
                case 10010002:
                    t = "\u60a8\u7684\u8d26\u53f7\u5728\u522b\u5904\u767b\u5f55",
                    gl.userinfo.isWeChat && wx.exitMiniProgram();
                    break;
                case 10010013:
                    t = "\u4eca\u65e5\u5206\u4eab\u6b21\u6570\u8fbe\u5230\u4e0a\u9650";
                    break;
                case 10010014:
                    t = "\u8bf7\u5206\u4eab\u5230\u597d\u53cb\u7fa4";
                    break;
                case 10010015:
                    t = "\u8bf7\u4e0d\u8981\u5206\u4eab\u5230\u540c\u4e2a\u7fa4";
                    break;
                case 0:
                    return !1
                }
                return "" != t && (gl.showTip(t),
                !0)
            }
        });
        t.exports = new o,
        cc._RF.pop()
    }
    , {
        sha1: "sha1"
    }],
    playerCtrl: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "3c82ayBRf9OOpIJL8UGofOm", "playerCtrl"),
        cc.Class({
            extends: cc.Component,
            properties: {
                roleList: [cc.Prefab]
            },
            onLoad: function() {
                this.isTouch = !1,
                this.role = null,
                this.roleScript = null,
                this.startPos = null,
                this.movePos = null,
                this.endPos = null,
                this.creatRole(),
                this.addListener(),
                gl.emitter.on("event_gameOver", this.gameOver, this),
                gl.emitter.on("event_gameWin", this.gameWin, this),
                gl.emitter.on("event_pauseGame", this.touchCancel, this)
            },
            gameOver: function() {
                this.offListener()
            },
            gameWin: function() {
                this.offListener()
            },
            creatRole: function() {
                var e = gl.userinfo.get("role");
                if (!this.roleList[e])
                    return console.error("\u76ae\u80a4\u4e0d\u5b58\u5728");
                this.role = cc.instantiate(this.roleList[e]);
                var t = gl.userinfo.get("playerPos");
                this.role.setPosition(t),
                this.role.parent = this.node,
                this.roleScript = this.role.getComponent("role")
            },
            touchStart: function(e) {
                this.isTouch = !0,
                this.startPos = e.touch.getLocation(),
                this.roleScript && this.roleScript.moveArm(gl.userinfo.posChnange(this.startPos), !0)
            },
            touchMove: function(e) {
                this.isTouch && (this.movePos = e.touch.getLocation(),
                this.roleScript && this.roleScript.moveArm(gl.userinfo.posChnange(this.movePos)))
            },
            touchEnd: function(e) {
                if (this.isTouch) {
                    this.isTouch = !1,
                    this.endPos = e.touch.getLocation();
                    gl.userinfo.get("guidanceState");
                    this.roleScript && this.roleScript.fireBullet(gl.userinfo.posChnange(this.endPos)),
                    this.roleScript && this.roleScript.stopArm()
                }
            },
            touchCancel: function(e) {
                this.isTouch = !1,
                console.log("\u89e6\u6478\u53d6\u6d88"),
                this.roleScript && this.roleScript.stopArm()
            },
            addListener: function() {
                this.node.on("touchstart", this.touchStart, this),
                this.node.on("touchmove", this.touchMove, this),
                this.node.on("touchend", this.touchEnd, this),
                this.node.on("touchcancel", this.touchCancel, this)
            },
            offListener: function() {
                this.node.off("touchstart", this.touchStart, this),
                this.node.off("touchmove", this.touchMove, this),
                this.node.off("touchend", this.touchEnd, this),
                this.node.off("touchcancel", this.touchCancel, this)
            },
            onDestroy: function() {
                gl.emitter.off("event_gameOver", this),
                gl.emitter.off("event_gameWin", this),
                gl.emitter.off("event_pauseGame", this),
                this.offListener()
            }
        }),
        cc._RF.pop()
    }
    , {}],
    "polyglot.min": [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        (function(e, o) {
            "function" == typeof define && define.amd ? define([], function() {
                return o(e)
            }) : "object" == (void 0 === i ? "undefined" : n(i)) ? t.exports = o(e) : e.Polyglot = o(e)
        }
        )(void 0, function(e) {
            function t(e) {
                e = e || {},
                this.phrases = {},
                this.extend(e.phrases || {}),
                this.currentLocale = e.locale || "en",
                this.allowMissing = !!e.allowMissing,
                this.warn = e.warn || l
            }
            function i(e) {
                var t, i, n, o = {};
                for (t in e)
                    if (e.hasOwnProperty(t))
                        for (n in i = e[t])
                            o[i[n]] = t;
                return o
            }
            function o(e) {
                return e.replace(/^\s+|\s+$/g, "")
            }
            function s(e, t, i) {
                var n, s;
                return null != i && e ? n = o((s = e.split(u))[c(t, i)] || s[0]) : n = e,
                n
            }
            function a(e) {
                var t = i(g);
                return t[e] || t.en
            }
            function c(e, t) {
                return d[a(e)](t)
            }
            function r(e, t) {
                for (var i in t)
                    "_" !== i && t.hasOwnProperty(i) && (e = e.replace(new RegExp("%\\{" + i + "\\}","g"), t[i]));
                return e
            }
            function l(t) {
                e.console && e.console.warn && e.console.warn("WARNING: " + t)
            }
            function h(e) {
                var t = {};
                for (var i in e)
                    t[i] = e[i];
                return t
            }
            t.VERSION = "0.4.3",
            t.prototype.locale = function(e) {
                return e && (this.currentLocale = e),
                this.currentLocale
            }
            ,
            t.prototype.extend = function(e, t) {
                var i;
                for (var o in e)
                    e.hasOwnProperty(o) && (i = e[o],
                    t && (o = t + "." + o),
                    "object" == (void 0 === i ? "undefined" : n(i)) ? this.extend(i, o) : this.phrases[o] = i)
            }
            ,
            t.prototype.clear = function() {
                this.phrases = {}
            }
            ,
            t.prototype.replace = function(e) {
                this.clear(),
                this.extend(e)
            }
            ,
            t.prototype.t = function(e, t) {
                var i, n;
                return "number" == typeof (t = null == t ? {} : t) && (t = {
                    smart_count: t
                }),
                "string" == typeof this.phrases[e] ? i = this.phrases[e] : "string" == typeof t._ ? i = t._ : this.allowMissing ? i = e : (this.warn('Missing translation for key: "' + e + '"'),
                n = e),
                "string" == typeof i && (t = h(t),
                n = r(n = s(i, this.currentLocale, t.smart_count), t)),
                n
            }
            ,
            t.prototype.has = function(e) {
                return e in this.phrases
            }
            ;
            var u = "||||"
              , d = {
                chinese: function(e) {
                    return 0
                },
                german: function(e) {
                    return 1 !== e ? 1 : 0
                },
                french: function(e) {
                    return e > 1 ? 1 : 0
                },
                russian: function(e) {
                    return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                },
                czech: function(e) {
                    return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2
                },
                polish: function(e) {
                    return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                },
                icelandic: function(e) {
                    return e % 10 != 1 || e % 100 == 11 ? 1 : 0
                }
            }
              , g = {
                chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
                french: ["fr", "tl", "pt-br"],
                russian: ["hr", "ru"],
                czech: ["cs"],
                polish: ["pl"],
                icelandic: ["is"]
            };
            return t
        }),
        cc._RF.pop()
    }
    , {}],
    polyglot: [function(e, t, i) {
        (function(e) {
            "use strict";
            cc._RF.push(t, "69decSgpRlE1rzEKp0RzG3V", "polyglot");
            var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                return typeof e
            }
            : function(e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            }
            ;
            (function(e, o) {
                "function" == typeof define && define.amd ? define([], function() {
                    return o(e)
                }) : "object" === (void 0 === i ? "undefined" : n(i)) ? t.exports = o(e) : e.Polyglot = o(e)
            }
            )(void 0 !== e ? e : void 0, function(e) {
                var t = String.prototype.replace;
                function i(e) {
                    e = e || {},
                    this.phrases = {},
                    this.extend(e.phrases || {}),
                    this.currentLocale = e.locale || "en",
                    this.allowMissing = !!e.allowMissing,
                    this.warn = e.warn || m
                }
                i.VERSION = "1.0.0",
                i.prototype.locale = function(e) {
                    return e && (this.currentLocale = e),
                    this.currentLocale
                }
                ,
                i.prototype.extend = function(e, t) {
                    var i;
                    for (var o in e)
                        e.hasOwnProperty(o) && (i = e[o],
                        t && (o = t + "." + o),
                        "object" === (void 0 === i ? "undefined" : n(i)) ? this.extend(i, o) : this.phrases[o] = i)
                }
                ,
                i.prototype.unset = function(e, t) {
                    var i;
                    if ("string" == typeof e)
                        delete this.phrases[e];
                    else
                        for (var o in e)
                            e.hasOwnProperty(o) && (i = e[o],
                            t && (o = t + "." + o),
                            "object" === (void 0 === i ? "undefined" : n(i)) ? this.unset(i, o) : delete this.phrases[o])
                }
                ,
                i.prototype.clear = function() {
                    this.phrases = {}
                }
                ,
                i.prototype.replace = function(e) {
                    this.clear(),
                    this.extend(e)
                }
                ,
                i.prototype.t = function(e, t) {
                    var i, n;
                    return "number" == typeof (t = null == t ? {} : t) && (t = {
                        smart_count: t
                    }),
                    "string" == typeof this.phrases[e] ? i = this.phrases[e] : "string" == typeof t._ ? i = t._ : this.allowMissing ? i = e : (this.warn('Missing translation for key: "' + e + '"'),
                    n = e),
                    "string" == typeof i && (t = _(t),
                    n = p(n = h(i, this.currentLocale, t.smart_count), t)),
                    n
                }
                ,
                i.prototype.has = function(e) {
                    return e in this.phrases
                }
                ;
                var o = "||||"
                  , s = {
                    chinese: function(e) {
                        return 0
                    },
                    german: function(e) {
                        return 1 !== e ? 1 : 0
                    },
                    french: function(e) {
                        return e > 1 ? 1 : 0
                    },
                    russian: function(e) {
                        return e % 10 == 1 && e % 100 != 11 ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                    },
                    czech: function(e) {
                        return 1 === e ? 0 : e >= 2 && e <= 4 ? 1 : 2
                    },
                    polish: function(e) {
                        return 1 === e ? 0 : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20) ? 1 : 2
                    },
                    icelandic: function(e) {
                        return e % 10 != 1 || e % 100 == 11 ? 1 : 0
                    }
                }
                  , a = {
                    chinese: ["fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh"],
                    german: ["da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv"],
                    french: ["fr", "tl", "pt-br"],
                    russian: ["hr", "ru"],
                    czech: ["cs", "sk"],
                    polish: ["pl"],
                    icelandic: ["is"]
                };
                function c(e) {
                    var t, i, n, o = {};
                    for (t in e)
                        if (e.hasOwnProperty(t))
                            for (n in i = e[t])
                                o[i[n]] = t;
                    return o
                }
                var r = /^\s+|\s+$/g;
                function l(e) {
                    return t.call(e, r, "")
                }
                function h(e, t, i) {
                    var n, s;
                    return null != i && e ? (console.log(" fenge:  " + e + "  : " + o),
                    n = l((s = e.split(o))[d(t, i)] || s[0])) : n = e,
                    n
                }
                function u(e) {
                    var t = c(a);
                    return t[e] || t.en
                }
                function d(e, t) {
                    return s[u(e)](t)
                }
                var g = /\$/g
                  , f = "$$$$";
                function p(e, i) {
                    for (var n in i)
                        if ("_" !== n && i.hasOwnProperty(n)) {
                            var o = i[n];
                            "string" == typeof o && (o = t.call(i[n], g, f)),
                            e = t.call(e, new RegExp("%\\{" + n + "\\}","g"), o)
                        }
                    return e
                }
                function m(t) {
                    e.console && e.console.warn && e.console.warn("WARNING: " + t)
                }
                function _(e) {
                    var t = {};
                    for (var i in e)
                        t[i] = e[i];
                    return t
                }
                return i
            }),
            cc._RF.pop()
        }
        ).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {})
    }
    , {}],
    prefab_await: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "c4d4bPe+xBEW6UrvETLadag", "prefab_await"),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_jh: cc.Node,
                node_jbbg: cc.Node
            },
            onLoad: function() {
                this.node.scale = .7,
                this.dot_max = 8,
                this.index = 0,
                this.opacity = [255, 229, 204, 178, 153, 127, 102, 76],
                this.scale = [1, .9, .8, .7, .6, .5, .4, .3]
            },
            action: function() {
                this.node_jh.active = !0;
                for (var e = 0; e < 8; e++) {
                    var t = this.node_jh.getChildByName("img_jh" + (e + 1))
                      , i = (this.index + e) % this.dot_max;
                    t.scale = this.scale[i],
                    t.opacity = this.opacity[i]
                }
                this.index++,
                this.index >= 8 && (this.index = 0)
            },
            pauseAction: function() {
                this.unscheduleAllCallbacks()
            },
            startAction: function() {
                var e = this;
                this.unscheduleAllCallbacks(),
                this.node_jh.active = !1,
                this.node_jbbg.active = !1;
                for (var t = 0; t < 8; t++) {
                    var i = this.node_jh.getChildByName("img_jh" + (t + 1))
                      , n = (this.index + t) % this.dot_max;
                    i.scale = this.scale[n],
                    i.opacity = this.opacity[n]
                }
                this.scheduleOnce(function(t, i) {
                    e.node_jbbg.active = !0,
                    e.schedule(e.action.bind(e), .1)
                }, 2)
            },
            start: function() {}
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_flaunt: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "80c09THeY1L3b+46vwqVgwo", "prefab_flaunt"),
        cc.Class({
            extends: cc.Component,
            properties: {
                prefab_overMenu: cc.Prefab,
                lab_tip: cc.Label,
                lab_time: cc.Label,
                btn_skip: cc.Node
            },
            onLoad: function() {
                gl.userinfo.isWeChat && gl.wechat.showBannerAd(),
                gl.emitter.on("event_refreshprank", this.initInfo, this),
                this.initInfo()
            },
            initInfo: function() {
                var e = gl.userinfo.get("userRank");
                if (gl.bannerSize && gl.bannerSize[gl.bannerIndex]) {
                    var t = gl.bannerSize[gl.bannerIndex];
                    t.height && t.winHeight && (this.btn_skip.y = -(cc.winSize.height / 2 - t.height / (t.winHeight / cc.winSize.height)) + this.btn_skip.height / 2)
                }
                var i = e.rank
                  , n = e.rank_count
                  , o = n - 1 < 0 ? 1 : n - 1;
                this.lab_time.string = gl.userinfo.getStrTime(gl.userinfo.get("time")),
                this.ranking = 1 == n ? 100 : ((n - i) / o * 100).toFixed(2),
                this.lab_tip.string = "\u60a8\u8d85\u8d8a\u4e86\u5168\u7403" + this.ranking + "%\u7684\u73a9\u5bb6\uff0c\u5feb\u53bb\u670b\u53cb\u5708\u70ab\u8000\u4e00\u4e0b\u5427\uff01"
            },
            btn_skip_cb: function() {
                this.close()
            },
            btn_flaunt: function() {
                var e = this
                  , t = gl.userinfo.get("userRank")
                  , i = gl.userinfo.getStrTime(gl.userinfo.get("time"))
                  , n = t.pointid + 1;
                gl.userinfo.isWeChat && (gl.wechat.shareAppMessage("\u6211\u5728\u7b2c" + n + "\u5173\u7528\u65f6" + i + "\u79d2\u8d85\u8d8a\u4e86\u5168\u7403" + this.ranking + "%\u7684\u73a9\u5bb6\uff0c\u4e00\u6218\u75af\u795e\uff0c\u4f60\u53ef\u6562\u6765\u6218\uff1f", gl.SHARE_PICURL, "type=flaunt"),
                gl.backCb = function() {
                    e.close()
                }
                )
            },
            close: function() {
                cc.instantiate(this.prefab_overMenu).parent = cc.director.getScene(),
                this.node.destroy()
            },
            onDestroy: function() {
                gl.userinfo.isWeChat && gl.wechat.hideBannerAd(),
                gl.emitter.off("event_refreshprank", this)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_gudiancePass: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "ed1f8/WHltCJJcfQ3Zr/atc", "prefab_gudiancePass"),
        cc.Class({
            extends: cc.Component,
            properties: {},
            onLoad: function() {
                gl.userinfo.starList[0] = 3,
                gl.userinfo.cunguanka()
            },
            btn_nextPoint: function() {
                gl.userinfo.stamina > 0 ? (gl.userinfo.set("checkPoint", 1),
                gl.userinfo.reqEnterPoint()) : gl.emitter.emit("event_nostamina")
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_hintFrame: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "3bad6jdCudP5qIiLowtf96K", "prefab_hintFrame"),
        cc.Class({
            extends: cc.Component,
            properties: {
                label_hint: cc.Label,
                node_flag: [cc.Node]
            },
            onLoad: function() {
                gl.userinfo.isWeChat && "" == gl.userinfo.wechatadUnitId && gl.userinfo.reqGainAdId(),
                gl.userinfo.wechatflag || (this.label_hint.string = "\u770b\u5b8c\u89c6\u9891\uff0c\u52a05\u70b9\u4f53\u529b")
            },
            btn_cancel: function() {
                this.node.destroy(),
                gl.audio.clickPlay()
            },
            btn_addStamina: function() {
                gl.userinfo.isWeChat ? (0 == gl.userinfo.sharecount && "" != gl.userinfo.wechatadUnitId ? (gl.failVideo = function() {
                    gl.userinfo.reqGetShareStamina()
                }
                ,
                gl.wechat.showRewardVideoAd(function() {
                    gl.userinfo.reqStamina(2, "", ""),
                    gl.userinfo.wechatflag && gl.wechat.shareAppMessages()
                }, function() {
                    gl.wechat.shareAppMessages()
                })) : gl.userinfo.reqGetShareStamina(),
                this.node.destroy()) : (gl.userinfo.stamina = 10,
                gl.emitter.emit("event_refreshstamina"),
                this.node.destroy()),
                gl.audio.clickPlay()
            },
            start: function() {},
            onDestroy: function() {}
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_horseRace: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "47a37lF1MpDUZVz5ebg1bwf", "prefab_horseRace"),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_mask: cc.Node,
                node_race: cc.Node,
                node_bg: cc.Node
            },
            onLoad: function() {
                this.speed = 55,
                this.horseRace = gl.userinfo.get("horseRace"),
                this.initRace()
            },
            initRace: function() {
                this.horseInterval = 0;
                var e = this.horseRace[gl.horseRace.horseIndex];
                if (this.horseRace) {
                    if (!e && (gl.horseRace.count = 0,
                    gl.horseRace.contentIndex = 0,
                    gl.horseRace.horseIndex = 0,
                    e = this.horseRace[gl.horseRace.horseIndex],
                    console.log("\u8dd1\u9a6c\u706f\u4ece\u5934\u5f00\u59cb"),
                    !e))
                        return console.error("\u8dd1\u9a6c\u706f\u9519\u8bef");
                    this.horseInterval = e.interval,
                    this.times = e.times,
                    this.startTime = e.starttime,
                    this.endTime = e.endtime,
                    this.content = e.string || [],
                    this.startAction()
                }
            },
            hide: function() {
                this.node_race.getComponent(cc.Label).string = " ",
                this.node_bg.active = !1
            },
            show: function() {
                this.node_bg.active = !0
            },
            getContent: function() {
                var e = this.content[gl.horseRace.contentIndex];
                return console.log("\u8dd1\u9a6c\u706f\u5185\u5bb9=" + this.content[gl.horseRace.contentIndex] + gl.horseRace.contentIndex),
                gl.horseRace.contentIndex += 1,
                gl.horseRace.contentIndex > this.content.length - 1 && (gl.horseRace.contentIndex = 0,
                gl.horseRace.count += 1),
                e
            },
            startAction: function() {
                var e = this;
                if (this.nowTime = Math.floor((new Date).getTime() / 1e3),
                this.nowTime >= this.startTime && this.nowTime <= this.endTime && gl.horseRace.count < this.times) {
                    var t = this.getContent();
                    this.node_race.getComponent(cc.Label).string = t,
                    this.node_race.x = this.node_mask.width;
                    var i = cc.v2(0 - this.node_race.width, 0);
                    this.show(),
                    this.node_race.runAction(cc.sequence(cc.moveTo(this.node_race.width / this.speed, i), cc.callFunc(function() {
                        e.hide()
                    }), cc.delayTime(this.horseInterval), cc.callFunc(function() {
                        e.startAction()
                    })))
                } else
                    console.log("\u64ad\u653e\u4e0b\u4e00\u6761\u8dd1\u9a6c\u706f##nowTime" + this.nowTime + "##starttime" + this.startTime + "##endTime" + this.endTime + "##count" + gl.horseRace.count + "##times" + this.times),
                    gl.horseRace.count = 0,
                    gl.horseRace.contentIndex = 0,
                    gl.horseRace.horseIndex += 1,
                    this.initRace()
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_loading: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "dbfa7nv5I9C+6eJAliCaM0j", "prefab_loading"),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_bg: cc.Node,
                node_light: cc.Node,
                node_textColor: cc.Node,
                progress: cc.ProgressBar,
                prefab_light: cc.Prefab
            },
            onLoad: function() {
                this.delayTime = 50,
                this.progress_count = 0,
                this.progress.progress = 0,
                this.progress_end = !1,
                this.initWnd(),
                gl.emitter.on("event_login", this.closeLoading, this),
                gl.emitter.on("event_startlogin", this.startLoading, this)
            },
            initWnd: function() {
                this.node_bg.color = gl.bottom_color[gl.color_index];
                for (var e = 1; e <= 2; e++) {
                    this.node_bg.getChildByName("img_ztop" + e).color = gl.light_color[gl.color_index]
                }
                this.node_textColor.color = gl.light_color[gl.color_index];
                var t = cc.instantiate(this.prefab_light);
                t.parent = this.node_light,
                t.scaleX = 1.3,
                t.scaleY = 1.05
            },
            startLoading: function() {
                this.schedule(this.loadingAction.bind(this), .1)
            },
            loadingAction: function() {
                this.progress_end || (this.progress_count++,
                this.progress.progress = this.progress_count / this.delayTime,
                this.delayTime === this.progress_count && this.unschedule(this.loadingAction.bind(this)))
            },
            closeLoading: function() {
                var e = this;
                this.progress_end = !0,
                this.progress.progress = 1,
                this.unschedule(this.loadingAction.bind(this)),
                this.scheduleOnce(function() {
                    e.node.destroy()
                }, .1)
            },
            start: function() {},
            onDestroy: function() {
                gl.wechat.showBannerAd(),
                gl.emitter.off("event_startlogin", this),
                gl.emitter.off("event_login", this)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_lookClubRank: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "36a9dDLpgFIcY+xYF+fSki4", "prefab_lookClubRank");
        cc.Class({
            extends: cc.Component,
            properties: {
                node_bg: cc.Node,
                node_color: [cc.Node],
                sprite_rankingScrollView: cc.Sprite
            },
            onLoad: function() {
                this.tex = new cc.Texture2D,
                this.blSetWin = !1,
                this.initWnd()
            },
            initWnd: function() {
                for (var e in this.node_bg.color = gl.bottom_color[gl.color_index],
                this.node_color) {
                    this.node_color[e].color = gl.button_color[gl.color_index]
                }
            },
            onButton: function(e) {
                switch (e.target.name) {
                case "btn_close":
                    this.node.destroy();
                    break;
                case "btn_left":
                    this.onLeftPage();
                    break;
                case "btn_right":
                    this.onRightPage()
                }
                gl.audio.clickPlay()
            },
            onLeftPage: function() {
                gl.wechat.openDataPostMessage({
                    messageType: gl.MESSAGE_TYPE.RANK_PAGE,
                    page: 0
                })
            },
            onRightPage: function() {
                gl.wechat.openDataPostMessage({
                    messageType: gl.MESSAGE_TYPE.RANK_PAGE,
                    page: 1
                })
            },
            start: function() {},
            onDestroy: function() {},
            update: function(e) {
                if (window.sharedCanvas && this.tex) {
                    if (!this.blSetWin) {
                        var t = cc.director.getWinSize();
                        window.sharedCanvas.width = t.width,
                        window.sharedCanvas.height = t.height,
                        this.blSetWin = !0
                    }
                    this.tex.initWithElement(window.sharedCanvas),
                    this.tex.handleLoadedTexture(),
                    this.sprite_rankingScrollView.spriteFrame = new cc.SpriteFrame(this.tex)
                }
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_lookRank: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "5a287Sb5E9Cc7D/C2LYsp+P", "prefab_lookRank");
        var n = 0
          , o = 1
          , s = 0
          , a = 1;
        cc.Class({
            extends: cc.Component,
            properties: {
                node_bg: cc.Node,
                node_light: cc.Node,
                node_roleData: cc.Node,
                node_btnSelect: [cc.Node],
                sf_rankPic: [cc.SpriteFrame],
                node_color: [cc.Node],
                prefab_light: cc.Prefab,
                node_roleStrip: cc.Node,
                node_rankContent: cc.Node,
                sprite_rankingScrollView: cc.Sprite
            },
            onLoad: function() {
                this.tex = new cc.Texture2D,
                this.blSetWin = !1,
                this.rank_page = 1,
                this.rank_web_page = 1,
                this.rank_init = !1,
                this.rank_count = 12,
                this.rank_count_min = 4,
                this.name_width = 224,
                this.blRecord = !0,
                this.rank_type = n,
                this.rank_select_color = [cc.color(255, 175, 72), cc.color(212, 212, 212)],
                this.initWnd(),
                gl.emitter.on("event_rankuser", this.initUserRole, this),
                gl.emitter.on("event_ownerrank", this.rankView, this),
                this.setBtnColor(),
                this.setRankListOpen(),
                gl.userinfo.isWeChat && gl.wechat.openDataPostMessage({
                    messageType: gl.MESSAGE_TYPE.GAIN_RANK,
                    MAIN_MENU_NUM: gl.wechat_rank_key
                }),
                this.node_roleData.active = !1
            },
            initWnd: function() {
                this.node_bg.color = gl.bottom_color[gl.color_index];
                for (var e = 1; e <= 2; e++) {
                    this.node_bg.getChildByName("img_ztop" + e).color = gl.light_color[gl.color_index]
                }
                var t = cc.instantiate(this.prefab_light);
                for (var i in t.parent = this.node_light,
                t.scaleX = 1.3,
                t.scaleY = 1.2,
                this.node_color) {
                    this.node_color[i].color = gl.button_color[gl.color_index]
                }
            },
            ownerRank: function() {
                gl.userinfo.isWeChat && gl.userinfo.reqOwnerRank(this.rank_web_page, this.rank_count)
            },
            rankView: function() {
                this.rank_init = !0;
                var e = (this.rank_page - 1) * this.rank_count_min
                  , t = this.rank_page * this.rank_count_min
                  , i = 0
                  , n = gl.userinfo.get("ownerRank");
                if (e > n.length)
                    return this.rank_page--,
                    void (this.blRecord = !1);
                this.node_rankContent.removeAllChildren();
                for (var o = e; o < t; o++) {
                    var s = n[o];
                    s && s.rank && (this.addRoleData(s),
                    i++)
                }
                n.length < t || i < this.rank_count_min ? this.blRecord = !1 : this.blRecord = !0
            },
            initUserRole: function() {
                var e = gl.userinfo.get("userRank");
                this.setRestsRoleData(this.node_roleData, e, !0)
            },
            addRoleData: function(e) {
                var t = cc.instantiate(this.node_roleStrip);
                t.active = !0,
                t.parent = this.node_rankContent,
                this.setRestsRoleData(t, e)
            },
            setRestsRoleData: function(e, t) {
                var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
                  , n = e.getChildByName("img_rank")
                  , o = n ? n.getComponent(cc.Sprite) : null
                  , s = e.getChildByName("label_rank").getComponent(cc.Label)
                  , a = e.getChildByName("icon")
                  , c = e.getChildByName("label_name").getComponent(cc.Label)
                  , r = e.getChildByName("label_point").getComponent(cc.Label)
                  , l = e.getChildByName("label_time").getComponent(cc.Label)
                  , h = e.getChildByName("sp_star").getChildByName("lab_starNum").getComponent(cc.Label);
                o && (o.node.active = !1),
                s.node.active = !1,
                t.rank > 3 || i ? (s.node.active = !0,
                s.string = "" + t.rank,
                h.node.color = cc.color(0, 0, 0)) : (o.node.active = !0,
                o.spriteFrame = this.sf_rankPic[t.rank - 1],
                h.node.color = cc.color(255, 0, 0)),
                gl.showRemoteImage(a, t.avatar),
                c.string = "" + t.nickname,
                c.node.width >= this.name_width && (c.node.scale = this.name_width / c.node.width),
                r.string = parseInt(t.pointid) + 1 + "\u5173",
                l.string = gl.userinfo.getStrTime(t.finishtime),
                t.star_total ? h.string = "X" + t.star_total : h.string = "X" + t.star
            },
            setBtnColor: function() {
                this.node_btnSelect[n].color = this.rank_select_color[a],
                this.node_btnSelect[o].color = this.rank_select_color[a],
                this.rank_type == n ? this.node_btnSelect[n].color = this.rank_select_color[s] : this.node_btnSelect[o].color = this.rank_select_color[s]
            },
            setRankListOpen: function() {
                this.node_roleData.active = !1,
                this.node_rankContent.active = !1,
                this.rank_type == n || (this.node_rankContent.active = !0,
                this.node_roleData.active = !0,
                this.rank_init || this.ownerRank())
            },
            onButton: function(e) {
                switch (e.target.name) {
                case "btn_close":
                    this.node.destroy();
                    break;
                case "btn_invitation":
                    this.rank_type != n && (this.rank_type = n,
                    this.setBtnColor(),
                    this.setRankListOpen(),
                    gl.wechat.openDataPostMessage({
                        messageType: gl.MESSAGE_TYPE.SHOW_RANK
                    }));
                    break;
                case "btn_allrank":
                    this.rank_type != o && (this.rank_type = o,
                    this.setBtnColor(),
                    this.setRankListOpen(),
                    gl.wechat.openDataPostMessage({
                        messageType: gl.MESSAGE_TYPE.HIDE_RANK
                    }));
                    break;
                case "btn_left":
                    this.onLeftPage();
                    break;
                case "btn_right":
                    this.onRightPage()
                }
                gl.audio.clickPlay()
            },
            onLeftPage: function() {
                this.rank_type == n ? gl.wechat.openDataPostMessage({
                    messageType: gl.MESSAGE_TYPE.RANK_PAGE,
                    page: 0
                }) : this.rank_page > 1 && (this.rank_page--,
                this.rankView())
            },
            onRightPage: function() {
                if (this.rank_type == n)
                    gl.wechat.openDataPostMessage({
                        messageType: gl.MESSAGE_TYPE.RANK_PAGE,
                        page: 1
                    });
                else {
                    var e = gl.userinfo.get("ownerRank")
                      , t = this.rank_page * this.rank_count_min;
                    e && 1 == this.blRecord && this.rank_page < 25 && (this.rank_page++,
                    e.length <= t ? (this.rank_web_page++,
                    this.ownerRank()) : this.rankView())
                }
            },
            start: function() {},
            onDestroy: function() {
                "start" === cc.director.getScene().name && gl.wechat.showBannerAd(),
                gl.emitter.off("event_rankuser", this),
                gl.emitter.off("event_ownerrank", this)
            },
            update: function(e) {}
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_notice: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "becf2YN4xdJdLegNuboJsjB", "prefab_notice"),
        cc.Class({
            extends: cc.Component,
            properties: {
                lab_content: cc.Label
            },
            onLoad: function() {
                gl.userinfo.isWeChat && gl.wechat.hideBannerAd(),
                this.initPanel()
            },
            initPanel: function() {
                this.notice = gl.userinfo.get("bulletin");
                var e = this.notice.content;
                this.lab_content.string = e
            },
            btn_close: function() {
                this.node.destroy()
            },
            onDestroy: function() {
                gl.userinfo.isWeChat && gl.wechat.showBannerAd()
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_nowRole: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "7aaebcgLHZAz5XOfttaVu/q", "prefab_nowRole"),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_role: cc.Node
            },
            onLoad: function() {},
            btn_close: function() {
                this.selectIndex = null,
                this.node.destroy()
            },
            btn_getFree: function() {
                var e = this;
                gl.userinfo.isWeChat && gl.userinfo.wechatflag ? (gl.failVideo = function() {
                    gl.showTip("\u656c\u8bf7\u671f\u5f85")
                }
                ,
                gl.wechat.showRewardVideoAd(function() {
                    gl.network.send("http.reqUnlockSkin", {
                        skinIndex: e.selectIndex,
                        type: 2
                    }, function(t, i) {
                        console.log("\u89e3\u9501\u76ae\u80a4\u7ed3\u679c", i),
                        1 == i.state && (gl.userinfo.skinList[e.selectIndex] = e.selectIndex),
                        gl.userinfo.role = e.selectIndex - 1,
                        e.node.destroy()
                    })
                })) : gl.showTip("\u656c\u8bf7\u671f\u5f85")
            },
            refreshRole: function(e) {
                var t = this;
                this.selectIndex = Number(e),
                cc.loader.loadResDir("/dragon/dragon_role" + this.selectIndex, function(e, i) {
                    var n = t.node_role.getComponent(dragonBones.ArmatureDisplay);
                    for (var o in i)
                        i[o]instanceof dragonBones.DragonBonesAsset && (n.dragonAsset = i[o]),
                        i[o]instanceof dragonBones.DragonBonesAtlasAsset && (n.dragonAtlasAsset = i[o])
                })
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_openBox: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "72988AMcQ1IhaDVQgexbNKa", "prefab_openBox"),
        cc.Class({
            extends: cc.Component,
            properties: {
                btn_skip: cc.Node
            },
            onLoad: function() {
                gl.userinfo.isWeChat && gl.wechat.showBannerAd(),
                gl.emitter.emit("event_gamesopne", !1),
                this.initSkipPos()
            },
            initSkipPos: function() {
                if (gl.bannerSize && gl.bannerSize[gl.bannerIndex]) {
                    var e = gl.bannerSize[gl.bannerIndex];
                    e.height && e.winHeight && (this.btn_skip.y = -(cc.winSize.height / 2 - e.height / (e.winHeight / cc.winSize.height)) + this.btn_skip.height / 2)
                }
            },
            btn_boom_cb: function() {
                gl.userinfo.isWeChat ? 0 == Math.floor(2 * Math.random()) ? this.viedoOpen() : this.shareOpen() : this.breakBottle()
            },
            viedoOpen: function() {
                var e = this;
                gl.failVideo = function() {
                    e.shareOpen()
                }
                ,
                gl.wechat.showRewardVideoAd(function() {
                    e.breakBottle(),
                    gl.wechat.shareAppMessage()
                }, function() {
                    gl.wechat.shareAppMessages()
                })
            },
            shareOpen: function() {
                var e = this;
                gl.wechat.shareAppMessage(),
                gl.backCb = function() {
                    e.breakBottle()
                }
                ,
                gl.failCb = function() {
                    gl.showTip("\u5206\u4eab\u5931\u8d25")
                }
            },
            btn_skip_cb: function() {
                this.node && this.node.destroy()
            },
            breakBottle: function() {
                var e = this;
                this.scheduleOnce(function() {
                    gl.emitter.emitOnce("eventOnce_bottleBreak"),
                    e.node && e.node.destroy()
                }, .5)
            },
            onDestroy: function() {
                gl.emitter.emit("event_gamesopne", !0),
                gl.userinfo.isWeChat && gl.wechat.hideBannerAd()
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_overMenu: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "04378Psz3lFApEHm/kmXnVs", "prefab_overMenu"),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_bg: cc.Node,
                node_win: cc.Node,
                node_fail: cc.Node,
                node_rank: cc.Node,
                node_light: cc.Node,
                node_wudi: cc.Node,
                node_again: cc.Node,
                label_stamina: cc.Label,
                node_color: [cc.Node],
                prefab_switchRol: cc.Prefab,
                prefab_lookclub: cc.Prefab,
                prefab_light: cc.Prefab,
                label_staminatime: cc.Label,
                node_flag: [cc.Node],
                prefab_ad: cc.Prefab,
                prefab_nowRole: cc.Prefab,
                node_specialStart: cc.Node
            },
            onLoad: function() {
                if (this.initWnd(),
                this.initMenu(),
                gl.emitter.on("event_refreshprank", this.initRank, this),
                gl.emitter.on("event_refreshstamina", this.refreshStamina, this),
                gl.audio.setSound(!1),
                !gl.userinfo.wechatflag) {
                    for (var e in this.node_flag) {
                        this.node_flag[e].active = !1
                    }
                    this.node_again.x = 0
                }
                this.showNewRole()
            },
            initWnd: function() {
                this.node_bg.color = gl.bottom_color[gl.color_index];
                for (var e = 1; e <= 2; e++) {
                    this.node_bg.getChildByName("img_ztop" + e).color = gl.light_color[gl.color_index]
                }
                var t = cc.instantiate(this.prefab_light);
                for (var i in t.parent = this.node_light,
                t.scaleX = 1.3,
                t.scaleY = 1.2,
                this.node_color) {
                    this.node_color[i].color = gl.button_color[gl.color_index]
                }
                this.refreshStamina()
            },
            refreshStamina: function() {
                this.label_stamina.string = "" + gl.userinfo.get("stamina")
            },
            showNewRole: function() {
                if (this.isWin = gl.userinfo.get("isWin"),
                this.isWin) {
                    var e = Number(gl.userinfo.get("checkPoint")) + 1
                      , t = gl.userinfo.lockPoint
                      , i = gl.userinfo.skinList;
                    for (var n in t)
                        if (e == t[n] && !i[n]) {
                            var o = cc.instantiate(this.prefab_nowRole);
                            return o.parent = this.node,
                            void o.getComponent("prefab_nowRole").refreshRole(n)
                        }
                }
            },
            initMenu: function() {
                (this.isWin = gl.userinfo.get("isWin"),
                this.node_win.active = !1,
                this.node_fail.active = !1,
                this.isWin) ? (this.node_win.active = !0,
                this.initRank()) : (this.node_fail.active = !0,
                this.node_wudi.getChildByName("label_" + parseInt(3 * Math.random() + 1)).active = !0)
            },
            initRank: function() {
                for (var e = gl.userinfo.get("pointRank"), t = 1, i = this.node_rank.childrenCount; t < i; t++) {
                    var n = e[t - 1]
                      , o = this.node_rank.getChildByName("node_rank" + t)
                      , s = o.getChildByName("icon")
                      , a = o.getChildByName("name").getComponent(cc.Label)
                      , c = o.getChildByName("time").getComponent(cc.Label)
                      , r = o.getChildByName("starList");
                    if (n) {
                        gl.showRemoteImage(s, n.avatar),
                        a.string = n.nickname,
                        c.string = gl.userinfo.getStrTime(n.finishtime);
                        for (var l = 0; l < n.star; l++) {
                            if (l >= 3)
                                return;
                            r ? r.children[l].getChildByName("star").active = !0 : console.error(r, l)
                        }
                    } else
                        o.active = !1
                }
                var h = gl.userinfo.get("userRank")
                  , u = this.node_rank.getChildByName("node_rank4")
                  , d = u.getChildByName("img_bg")
                  , g = u.getChildByName("label_rank").getComponent(cc.Label)
                  , f = u.getChildByName("icon")
                  , p = u.getChildByName("name").getComponent(cc.Label)
                  , m = u.getChildByName("time").getComponent(cc.Label)
                  , _ = u.getChildByName("starList");
                d.color = gl.light_color[gl.color_index],
                g.string = "" + h.rank,
                gl.showRemoteImage(f, h.avatar),
                p.string = h.nickname,
                m.string = gl.userinfo.getStrTime(h.finishtime);
                for (var b = 0; b < h.star; b++) {
                    if (b >= 3)
                        return;
                    _ ? _.children[b].getChildByName("star").active = !0 : console.error(_, b)
                }
            },
            btn_backToMenu: function() {
                new Promise(function(e, t) {
                    cc.director.preloadScene("start", function(t, i) {
                        if (!t)
                            return e();
                        console.error(t)
                    })
                }
                ).then(function() {
                    cc.director.loadScene("start"),
                    gl.wechat.showBannerAd()
                })
            },
            btn_share: function() {
                gl.wechat.shareAppMessage(gl.SHARE_TITLE, gl.SHARE_PICURL, "login=true")
            },
            btn_showSpecialStart: function() {
                this.node_specialStart.active = !0
            },
            btn_specialStart: function() {
                gl.userinfo.stamina > 0 ? gl.userinfo.isWeChat ? gl.userinfo.reqGetVideoRevive() : (gl.userinfo.shield = gl.userinfo.shieldMax,
                gl.userinfo.reqEnterPoint()) : gl.emitter.emit("event_nostamina")
            },
            btn_closePanel: function() {
                this.node_specialStart.active = !1
            },
            btn_again: function() {
                gl.userinfo.stamina > 0 ? gl.userinfo.reqEnterPoint() : gl.emitter.emit("event_nostamina")
            },
            btn_switchRole: function() {
                var e = cc.instantiate(this.prefab_switchRol);
                e.parent = this.node,
                e.getComponent("prefab_selectRole").isInGame()
            },
            btn_next: function() {
                if (gl.userinfo.stamina > 0) {
                    var e = gl.userinfo.get("pointCount")
                      , t = gl.userinfo.get("checkPoint");
                    e >= t + 1 ? (gl.userinfo.set("checkPoint", t += 1),
                    gl.userinfo.reqEnterPoint()) : gl.showTip("\u8fd8\u672a\u5f00\u653e\u656c\u8bf7\u671f\u5f85\uff01")
                } else
                    gl.emitter.emit("event_nostamina")
            },
            btn_checkRank: function() {
                var e = this;
                gl.wechat.shareClubRank(function() {
                    cc.instantiate(e.prefab_lookclub).parent = e.node
                })
            },
            onButton: function(e) {
                switch (e.target.name) {
                case "btn_checkrank":
                    this.btn_checkRank();
                    break;
                case "btn_again":
                    this.btn_again();
                    break;
                case "btn_showSpecialStart":
                    this.btn_showSpecialStart();
                    break;
                case "btn_specialStart":
                    this.btn_specialStart();
                    break;
                case "btn_selectRole":
                    this.btn_switchRole();
                    break;
                case "btn_next":
                    this.btn_next();
                    break;
                case "btn_share":
                    this.btn_share();
                    break;
                case "btn_backToStart":
                    this.btn_backToMenu();
                    break;
                case "btn_closePanel":
                    this.btn_closePanel()
                }
                gl.audio.clickPlay()
            },
            update: function(e) {
                this.label_staminatime && (this.label_staminatime.string = gl.userinfo.getStaminaTime())
            },
            onDestroy: function() {
                gl.emitter.off("event_refreshprank", this),
                gl.emitter.off("event_refreshstamina", this),
                gl.userinfo.clearRankPoint(),
                gl.audio.setSound(!0)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_pauseMenu: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "e80fdIjwtBAJ7TTszHEDWR9", "prefab_pauseMenu"),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_bg: cc.Node,
                label_time: cc.Label,
                label_stamina: cc.Label,
                node_color: [cc.Node],
                label_staminatime: cc.Label
            },
            onLoad: function() {
                gl.emitter.emit("event_gamesopne", !1),
                this.initWnd(),
                this.refreshTime(),
                gl.emitter.on("event_refreshstamina", this.refreshStamina, this),
                cc.audioEngine.pauseAll()
            },
            update: function(e) {
                this.label_staminatime && (this.label_staminatime.string = gl.userinfo.getStaminaTime())
            },
            initWnd: function() {
                for (var e in this.node_bg.color = gl.bottom_color[gl.color_index],
                this.node_color) {
                    this.node_color[e].color = gl.button_color[gl.color_index]
                }
                this.refreshStamina()
            },
            refreshStamina: function() {
                this.label_stamina.string = "" + gl.userinfo.get("stamina")
            },
            btn_continue: function() {
                gl.emitter.emit("event_gamesopne", !0),
                this.node.destroy(),
                gl.emitter.emit("event_gamecontinue"),
                cc.audioEngine.resumeAll(),
                gl.audio.clickPlay()
            },
            btn_backToMenu: function() {
                gl.emitter.emit("event_gamesopne", !0),
                new Promise(function(e, t) {
                    cc.director.preloadScene("start", function(t, i) {
                        if (!t)
                            return e();
                        console.error(t)
                    })
                }
                ).then(function() {
                    cc.director.loadScene("start"),
                    gl.wechat.showBannerAd(),
                    gl.userinfo.shield = 0
                }),
                gl.audio.clickPlay()
            },
            btn_again: function() {
                gl.userinfo.get("stamina") > 0 ? gl.userinfo.reqEnterPoint() : gl.emitter.emit("event_nostamina"),
                gl.audio.clickPlay(),
                gl.userinfo.shield = 0
            },
            btn_switchRole: function() {
                gl.emitter.emit("event_opswitchRole"),
                gl.audio.clickPlay(),
                gl.userinfo.shield = 0
            },
            btn_lookRank: function() {
                gl.emitter.emit("event_oplookRank"),
                gl.audio.clickPlay()
            },
            refreshTime: function() {
                this.label_time.string = gl.userinfo.getStrTime()
            },
            start: function() {},
            onDestroy: function() {
                gl.emitter.off("event_refreshstamina", this)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_selectRole: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "20901GmrgdGgb2G8noiyc+C", "prefab_selectRole"),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_bg: cc.Node,
                lab_intro: cc.Label,
                page_roleList: cc.PageView,
                node_roleContent: cc.Node,
                node_light: cc.Node,
                node_btnColor: [cc.Node],
                prefab_light: cc.Prefab,
                btn_select: cc.Node,
                btn_video: cc.Node,
                btn_noLock: cc.Node
            },
            onLoad: function() {
                this.page_count = 7,
                this.selectIndex = gl.userinfo.get("role"),
                this.intro = gl.userinfo.get("intro"),
                this.isSwitch = !1,
                this.initWnd(),
                this.updateList(!1),
                this.updateText(),
                this.initRole(),
                this.chengeBtnState()
            },
            initWnd: function() {
                this.node_bg.color = gl.bottom_color[gl.color_index];
                for (var e = 1; e <= 2; e++) {
                    this.node_bg.getChildByName("img_ztop" + e).color = gl.light_color[gl.color_index]
                }
                for (var t = 0, i = this.node_btnColor.length; t < i; t++) {
                    this.node_btnColor[t].color = gl.button_color[gl.color_index]
                }
                var n = cc.instantiate(this.prefab_light);
                n.parent = this.node_light,
                n.scaleX = 1.3,
                n.scaleY = 1.2;
                for (var o = this.node_roleContent.childrenCount, s = 0; s < o; s++) {
                    var a = this.node_roleContent.getChildByName("page_" + s).getChildByName("img_lock");
                    0 != s ? gl.userinfo.skinList[s + 1] ? a.active = !1 : a.active = !0 : a.active = !1
                }
            },
            initRole: function() {
                for (var e = this.page_roleList.node.getChildByName("view").getChildByName("content").children, t = function(t) {
                    var i = e[t].getChildByName("role").getComponent(dragonBones.ArmatureDisplay);
                    cc.loader.loadResDir("/dragon/dragon_role" + (t + 1), function(e, t) {
                        for (var n in t)
                            t[n]instanceof dragonBones.DragonBonesAsset && (i.dragonAsset = t[n]),
                            t[n]instanceof dragonBones.DragonBonesAtlasAsset && (i.dragonAtlasAsset = t[n])
                    })
                }, i = 0; i < e.length; i++)
                    t(i)
            },
            chengeBtnState: function() {
                var e = this.selectIndex;
                if (0 == this.selectIndex)
                    return this.btn_video.active = !1,
                    this.btn_noLock.active = !1,
                    this.btn_select.active = !0;
                gl.userinfo.skinList[e + 1] ? this.initselectBtnState(!0) : this.initselectBtnState(!1)
            },
            initselectBtnState: function(e) {
                if (this.btn_select.active = e,
                e)
                    this.btn_video.active = !1,
                    this.btn_noLock.active = !1;
                else {
                    var t = Number(gl.userinfo.lockPoint[Number(this.selectIndex) + 1]);
                    gl.userinfo.hadPass > t - 1 ? (this.btn_video.active = !0,
                    this.btn_noLock.active = !1) : (this.btn_video.active = !1,
                    this.btn_noLock.active = !0,
                    this.btn_noLock.getChildByName("lab_lock").getComponent(cc.Label).string = "\u7b2c" + t + "\u5173\u89e3\u9501")
                }
            },
            updateList: function() {
                !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0] ? this.page_roleList.scrollToPage(this.selectIndex) : this.page_roleList.scrollToPercentHorizontal(this.getScrollIndex())
            },
            updateText: function() {
                this.intro[this.selectIndex] ? this.lab_intro.string = this.intro[this.selectIndex] : this.lab_intro.string = "\u65e0\u6b64\u4eba\u7269\u4ecb\u7ecd"
            },
            selectRoleAct: function() {
                for (var e = this.node_roleContent.getChildByName("page_" + this.selectIndex).getChildByName("role"), t = [], i = 0; i < 4; i++)
                    t.push(cc.moveBy(.1, i % 2 ? 15 : -15, 0));
                e.runAction(cc.sequence(t));
                for (var n = this.node_roleContent.getChildByName("page_" + this.selectIndex).getChildByName("img_lock"), o = [], s = 0; s < 4; s++)
                    o.push(cc.moveBy(.1, s % 2 ? 15 : -15, 0));
                n.runAction(cc.sequence(o))
            },
            getScrollIndex: function() {
                return 0 != this.selectIndex && this.selectIndex != this.page_count - 1 ? this.selectIndex / (this.page_count - 1) : this.selectIndex ? 1 : 0
            },
            isInGame: function() {
                this.isSwitch = !0
            },
            pageTouch: function(e) {
                this.selectIndex = e._lastPageIdx,
                this.updateText(),
                this.selectRoleAct(),
                this.chengeBtnState()
            },
            cb_left: function() {
                this.selectIndex -= 1,
                this.selectIndex = this.selectIndex < 0 ? 0 : this.selectIndex,
                this.updateList(),
                this.chengeBtnState(),
                gl.audio.clickPlay()
            },
            cb_right: function() {
                this.selectIndex += 1;
                var e = this.page_count - 1;
                this.selectIndex = this.selectIndex > e ? e : this.selectIndex,
                this.updateList(),
                this.chengeBtnState(),
                gl.audio.clickPlay()
            },
            cb_back: function() {
                this.node.destroy(),
                gl.audio.clickPlay()
            },
            cb_sure: function() {
                gl.userinfo.set("role", this.selectIndex),
                gl.userinfo.storageData(gl.role_key, this.selectIndex),
                gl.emitter.emit("event_refreshrole"),
                this.node.destroy(),
                gl.audio.clickPlay()
            },
            cb_video: function() {
                var e = this;
                gl.userinfo.wechatflag ? (gl.failVideo = function() {
                    gl.showTip("\u656c\u8bf7\u671f\u5f85")
                }
                ,
                gl.wechat.showRewardVideoAd(function() {
                    gl.network.send("http.reqUnlockSkin", {
                        skinIndex: e.selectIndex + 1,
                        type: 2
                    }, function(t, i) {
                        console.log("aaaaa", i),
                        1 == i.state && (gl.userinfo.skinList[e.selectIndex + 1] = i.state,
                        e.initselectBtnState(!0),
                        e.node_roleContent.getChildByName("page_" + e.selectIndex).getChildByName("img_lock").active = !1,
                        gl.userinfo.set("role", e.selectIndex),
                        gl.userinfo.storageData(gl.role_key, e.selectIndex),
                        gl.emitter.emit("event_refreshrole"))
                    })
                })) : gl.showTip("\u656c\u8bf7\u671f\u5f85")
            },
            start: function() {},
            onDestroy: function() {
                gl.wechat.showBannerAd()
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_selectScene: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "b6653+RHoJKkLmUEFuGvtya", "prefab_selectScene");
        var n = 0
          , o = 1
          , s = 2
          , a = {};
        a[n] = cc.color(212, 212, 212),
        a[o] = cc.color(112, 255, 42),
        a[s] = cc.color(255, 127, 57),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_bg: cc.Node,
                btn_preNode: cc.Node,
                node_pointList: cc.Node,
                btn_unlock: cc.Node,
                node_light: cc.Node,
                label_stamina: cc.Label,
                prefab_light: cc.Prefab,
                label_staminatime: cc.Label,
                pageview_content: cc.Node,
                node_color: [cc.Node],
                pageView: cc.PageView,
                node_page: cc.Node,
                node_star: cc.Node
            },
            onLoad: function() {
                this.selectIndex = 0,
                this.initWnd(),
                this.initList(),
                this.btn_unlock.active = !1,
                gl.emitter.on("event_refreshstamina", this.refreshStamina, this)
            },
            start: function() {
                this.initPageViewIndex()
            },
            update: function(e) {
                this.label_staminatime && (this.label_staminatime.string = gl.userinfo.getStaminaTime())
            },
            initPageViewIndex: function() {
                var e = Math.ceil((gl.userinfo.hadPass + 1) / 20) - 1;
                e = e > 4 ? 4 : e,
                console.log("\u6eda\u52a8\u5230\u6307\u5b9a\u9875\u9762" + e),
                this.pageView.getComponent(cc.PageView).scrollToPage(e, 0),
                this.selectIndex = e
            },
            initWnd: function() {
                this.node_bg.color = gl.bottom_color[gl.color_index];
                for (var e = 1; e <= 2; e++) {
                    this.node_bg.getChildByName("img_ztop" + e).color = gl.light_color[gl.color_index]
                }
                var t = cc.instantiate(this.prefab_light);
                for (var i in t.parent = this.node_light,
                t.scaleX = 1.3,
                t.scaleY = 1.2,
                this.node_color) {
                    this.node_color[i].color = gl.button_color[gl.color_index]
                }
                this.refreshStamina()
            },
            refreshStamina: function() {
                this.label_stamina.string = "" + gl.userinfo.get("stamina")
            },
            cb_unlock: function() {
                this.node_pointList.destroyAllChildren();
                var e = gl.userinfo.get("pointCount");
                gl.userinfo.set("hadPass", e),
                this.initList()
            },
            pageTouch: function(e) {
                this.selectIndex = e._lastPageIdx
            },
            cb_left: function() {
                this.selectIndex -= 1,
                this.selectIndex = this.selectIndex < 0 ? 0 : this.selectIndex,
                this.pageView.getComponent(cc.PageView).scrollToPage(this.selectIndex, .3)
            },
            cb_right: function() {
                this.selectIndex += 1;
                var e = Math.ceil((gl.userinfo.pointCount + 1) / 20) - 1;
                this.selectIndex = this.selectIndex >= e ? e : this.selectIndex,
                this.pageView.getComponent(cc.PageView).scrollToPage(this.selectIndex, .3)
            },
            initList: function() {
                for (var e = this, t = gl.userinfo.get("hadPass"), i = gl.levelArr.length, c = Math.ceil(i / 20), r = 0; r < c; r++) {
                    var l = cc.instantiate(this.node_page);
                    l.parent = this.pageview_content,
                    l.active = !0
                }
                for (var h = function(c) {
                    var r = cc.instantiate(e.btn_preNode)
                      , l = Math.ceil((c + 1) / 20) - 1;
                    r.parent = e.pageview_content.children[l],
                    r.active = !0,
                    r.getChildByName("label_point").getComponent(cc.Label).string = c + 1,
                    r.getChildByName("img_pwhite").color = gl.button_color[gl.color_index],
                    r.on("click", function(t) {
                        t.tag = c,
                        e.selectPoint(t)
                    }, e),
                    c > t ? r.color = a[n] : c == t && t <= i ? r.color = a[o] : (r.color = a[s],
                    e.showStar(r, c))
                }, u = 0; u < i; u++)
                    h(u)
            },
            showStar: function(e, t) {
                if (gl.userinfo.starList[t] || 0 == gl.userinfo.starList[t])
                    for (var i = gl.userinfo.starList[t], n = 1; n <= 3; n++) {
                        var o = cc.instantiate(this.node_star);
                        o.parent = e,
                        o.active = !0,
                        o.x = 45 * n - 90,
                        o.y = 2 == n ? -35 : -30,
                        i >= n && (o.children[0].active = !0)
                    }
            },
            cb_back: function() {
                this.node.destroy(),
                gl.wechat.showBannerAd(),
                gl.audio.clickPlay()
            },
            selectPoint: function(e) {
                var t = Number(e.tag);
                t > gl.userinfo.get("hadPass") || (gl.userinfo.set("checkPoint", t),
                gl.userinfo.stamina > 0 ? gl.userinfo.reqEnterPoint() : gl.emitter.emit("event_nostamina"),
                gl.audio.clickPlay())
            },
            onDestroy: function() {
                gl.emitter.off("event_refreshstamina", this)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_shareConcern: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "49964SEjKlL+7L/2JvqrHBX", "prefab_shareConcern"),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_bg: cc.Node,
                node_role: cc.Node,
                node_light: cc.Node,
                node_btnColor: cc.Node,
                prefab_light: cc.Prefab
            },
            onLoad: function() {
                this.initWnd(),
                gl.emitter.on("event_refreshrole", this.refreshRole, this)
            },
            initWnd: function() {
                this.node_bg.color = gl.bottom_color[gl.color_index];
                for (var e = 1; e <= 2; e++) {
                    this.node_bg.getChildByName("img_ztop" + e).color = gl.light_color[gl.color_index],
                    this.node_bg.getChildByName("img_zdown" + e).color = gl.light_color[gl.color_index]
                }
                this.node_btnColor.color = gl.button_color[gl.color_index],
                this.refreshRole();
                var t = cc.instantiate(this.prefab_light);
                t.parent = this.node_light,
                t.scaleX = 1.3,
                t.scaleY = 1.05
            },
            refreshRole: function() {
                var e = this
                  , t = gl.userinfo.get("role");
                cc.loader.loadResDir("/dragon/dragon_role" + (t + 1), function(t, i) {
                    var n = e.node_role.getComponent(dragonBones.ArmatureDisplay);
                    for (var o in i)
                        i[o]instanceof dragonBones.DragonBonesAsset && (n.dragonAsset = i[o]),
                        i[o]instanceof dragonBones.DragonBonesAtlasAsset && (n.dragonAtlasAsset = i[o])
                })
            },
            onButton: function(e) {
                switch (e.target.name) {
                case "btn_close":
                    this.node.destroy(),
                    gl.audio.clickPlay()
                }
            },
            start: function() {},
            onDestroy: function() {
                gl.wechat.showBannerAd(),
                gl.emitter.off("event_refreshrole", this)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_tip: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "522d7+17/JNe5sgSfQtpXBZ", "prefab_tip"),
        cc.Class({
            extends: cc.Component,
            properties: {
                bottom: cc.Node,
                content: cc.Label
            },
            onLoad: function() {
                var e = this;
                this.scheduleOnce(function() {
                    e.node.destroy()
                }, 1.5)
            },
            showTip: function(e) {
                this.content.string = e,
                this.bottom.width = this.content.node.width + 120
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_treasure: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "37161DTHNND95X8aq5IWQXF", "prefab_treasure"),
        cc.Class({
            extends: cc.Component,
            properties: {
                prefab_openBox: cc.Prefab
            },
            onLoad: function() {
                this.node.setPosition(cc.v2(-340, 310)),
                this.startAction()
            },
            startAction: function() {
                var e = this;
                this.node.stopAllActions();
                var t = this.randomPos();
                this.node.runAction(cc.sequence(cc.moveTo(5, t), cc.callFunc(function() {
                    e.startAction()
                })))
            },
            randomPos: function() {
                var e = 1280 * Math.random() - 640
                  , t = 720 * Math.random() - 360;
                return e = e > 0 ? e -= this.node.width : e += this.node.width,
                t = t > 0 ? t -= this.node.height : t += 200,
                cc.v2(e, t)
            },
            openBox: function() {
                console.log("\u6253\u5f00\u5b9d\u7bb1"),
                cc.instantiate(this.prefab_openBox).parent = cc.director.getScene().getChildByName("Canvas"),
                this.node.destroy()
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_tv: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "eb2f5O9myJH+ZnhlYFhIL0k", "prefab_tv"),
        cc.Class({
            extends: cc.Component,
            properties: {
                tvFrame: cc.Sprite,
                imgList: [cc.SpriteFrame]
            },
            onLoad: function() {
                var e = Math.floor(6 * Math.random());
                this.tvFrame.spriteFrame = this.imgList[e]
            }
        }),
        cc._RF.pop()
    }
    , {}],
    prefab_winPanel: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "a4e9bNIyApD0J/8iZeRSD6y", "prefab_winPanel");
        var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
        }
        : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        }
        ;
        cc.Class({
            extends: cc.Component,
            properties: {
                prefab_overMenu: cc.Prefab,
                lab_point: cc.Label,
                lab_time: cc.Label,
                starList: cc.Node,
                btn_skip: cc.Node,
                btnColor: cc.Node
            },
            onLoad: function() {
                this.btnColor.color = cc.color(91, 255, 71),
                gl.userinfo.isWeChat && gl.wechat.showBannerAd();
                var e = gl.userinfo.get("userRank");
                if (gl.bannerSize && gl.bannerSize[gl.bannerIndex]) {
                    var t = gl.bannerSize[gl.bannerIndex];
                    t.height && t.winHeight && (this.btn_skip.y = -(cc.winSize.height / 2 - t.height / (t.winHeight / cc.winSize.height)) + this.btn_skip.height / 2)
                }
                var i = e.rank
                  , n = e.rank_count
                  , o = n - 1 < 0 ? 1 : n - 1;
                this.lab_time.string = gl.userinfo.getStrTime(gl.userinfo.get("time")),
                this.ranking = 1 == n ? 100 : ((n - i) / o * 100).toFixed(2)
            },
            initPanel: function(e, t, i) {
                var o = this;
                this.lab_time.string = gl.userinfo.getStrTime(e),
                this.lab_point.string = "\u7b2c" + (i + 1) + "\u5173";
                for (var s = function(e) {
                    if (e >= 3)
                        return {
                            v: void 0
                        };
                    o.starList.children[e].getChildByName("star").opacity = 0,
                    o.starList.children[e].getChildByName("star").active = !0,
                    o.starList.children[e].runAction(cc.sequence(cc.delayTime(.3 * e + .4), cc.callFunc(function() {
                        o.starList.children[e].getChildByName("star").opacity = 255
                    }), cc.scaleTo(.2, 1.5, 1.5), cc.scaleTo(.1 + .2 * e, 1, 1)))
                }, a = 0; a < t; a++) {
                    var c = s(a);
                    if ("object" === (void 0 === c ? "undefined" : n(c)))
                        return c.v
                }
                gl.userinfo.starList[i] = t,
                gl.userinfo.cunguanka()
            },
            btn_flaunt_cb: function() {
                var e = this
                  , t = gl.userinfo.get("userRank")
                  , i = gl.userinfo.getStrTime(gl.userinfo.get("time"))
                  , n = t.pointid + 1;
                gl.userinfo.isWeChat ? (gl.wechat.shareAppMessage("\u6211\u5728\u7b2c" + n + "\u5173\u7528\u65f6" + i + "\u79d2\u8d85\u8d8a\u4e86\u5168\u7403" + this.ranking + "%\u7684\u73a9\u5bb6\uff0c\u4e00\u6218\u75af\u795e\uff0c\u4f60\u53ef\u6562\u6765\u6218\uff1f", gl.SHARE_PICURL, "type=flaunt"),
                gl.backCb = function() {
                    e.btn_close_cb()
                }
                ) : this.btn_close_cb()
            },
            btn_again_cb: function() {
                gl.userinfo.stamina > 0 ? gl.userinfo.reqEnterPoint() : gl.emitter.emit("event_nostamina")
            },
            btn_close_cb: function() {
                cc.instantiate(this.prefab_overMenu).parent = cc.director.getScene().getChildByName("Canvas"),
                this.node.destroy()
            },
            onDestroy: function() {
                gl.userinfo.isWeChat && gl.wechat.hideBannerAd()
            }
        }),
        cc._RF.pop()
    }
    , {}],
    role: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "9407d457K9Mk4haUKafKKeG", "role"),
        cc.Class({
            extends: cc.Component,
            properties: {
                head: cc.Node,
                upBody: cc.Node,
                arm_left: cc.Node,
                arm_right: cc.Node,
                hand_left: cc.Node,
                hand_right: cc.Node,
                line_left: cc.Node,
                line_right: cc.Node,
                foot_left: cc.Node,
                foot_right: cc.Node,
                node_shield: cc.Node,
                maozi: cc.Node
            },
            onLoad: function() {
                var e = this;
                this.node.opacity = 0,
                this.node.runAction(cc.sequence(cc.delayTime(.1), cc.callFunc(function() {
                    e.node.opacity = 255
                }))),
                this.isTouch = !1,
                this.handBody = null,
                this._velocity = null,
                this.miaoZhunNode = null,
                this.direction = !0,
                this.bulletSpeed = gl.userinfo.get("bulletSpeed"),
                this.shield = gl.userinfo.shield,
                this.node_shield.active = Boolean(this.shield),
                gl.emitter.on("event_gameOver", this.gameOver, this),
                gl.emitter.on("event_gameWin", this.gameWin, this),
                gl.emitter.on("event_offshield", this.offshield, this),
                gl.emitter.on("event_blasting", this.Blasting, this)
            },
            gameOver: function() {
                gl.userinfo.get("isWin") || (gl.userinfo.shield = 0,
                this.isTouch = !1,
                this.line_left.active = !1,
                this.line_right.active = !1,
                this.head.children[5].active = !0,
                this.maozi.getComponent(cc.WeldJoint) && this.maozi.getComponent(cc.WeldJoint).enabled && (this.maozi.getComponent(cc.WeldJoint).enabled = !1))
            },
            gameWin: function() {
                gl.userinfo.get("isWin") && (gl.userinfo.shield = 0,
                this.line_left.active = !1,
                this.line_right.active = !1,
                this.head.children[4].active = !0,
                this.dance())
            },
            offshield: function() {
                var e = this;
                this.node_shield.active = !1,
                this.shield = 0,
                this.scheduleOnce(function() {
                    e.head.getComponent(cc.RigidBody).fixedRotation = !1,
                    e.upBody.getComponent(cc.RigidBody).fixedRotation = !1,
                    e.foot_left.getComponent(cc.RigidBody).fixedRotation = !1,
                    e.foot_right.getComponent(cc.RigidBody).fixedRotation = !1
                })
            },
            moveArm: function(e) {
                var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1]
                  , i = gl.userinfo.get("guidanceState");
                this.isTouch = !0,
                this._velocity = cc.v2(e.x - this.upBody.x, e.y - this.upBody.y),
                this.miaoZhunNode && (this.miaoZhunNode.active = !1),
                this.line_left.active = !1,
                this.line_right.active = !1;
                var n = this.arm_left.position.sub(e).mag()
                  , o = this.arm_right.position.sub(e).mag();
                n > o ? (t && 0 == i && (this.handState = 1,
                gl.emitter.emit("event_guidanceStateChange", 1)),
                this.miaoZhunNode = this.head.children[2],
                this.handBody = this.hand_right.getComponent(cc.RigidBody),
                this.line_right.active = !0) : n < o && (t && 3 == i && (this.handState = 2,
                gl.emitter.emit("event_guidanceStateChange", 2)),
                this.miaoZhunNode = this.head.children[3],
                this.handBody = this.hand_left.getComponent(cc.RigidBody),
                this.line_left.active = !0),
                this.miaoZhunNode.active = !0
            },
            stopArm: function() {
                this.handState && (1 == this.handState ? gl.emitter.emit("event_guidanceStateChange", 3) : 2 == this.handState && gl.emitter.emit("event_guidanceStateChange", 4)),
                this.isTouch = !1,
                this.handBody = null,
                this._velocity = null,
                this.line_left.active = !1,
                this.line_right.active = !1,
                this.miaoZhunNode && (this.miaoZhunNode.active = !1,
                this.miaoZhunNode = null)
            },
            fireBullet: function(e) {
                var t = void 0
                  , i = void 0
                  , n = void 0
                  , o = this.arm_left.position.sub(e).mag()
                  , s = this.arm_right.position.sub(e).mag();
                o > s ? (t = cc.v2(this.hand_right.x, this.hand_right.y),
                i = this.hand_right.x - this.arm_right.x,
                n = this.hand_right.y - this.arm_right.y) : o < s && (t = cc.v2(this.hand_left.x, this.hand_left.y),
                i = this.hand_left.x - this.arm_left.x,
                n = this.hand_left.y - this.arm_left.y),
                this.radian = Math.atan2(n, i);
                var a = Math.cos(this.radian) * this.bulletSpeed
                  , c = Math.sin(this.radian) * this.bulletSpeed;
                0 !== this.shield && (this.head.getComponent(cc.RigidBody).fixedRotation = !0,
                this.upBody.getComponent(cc.RigidBody).fixedRotation = !0,
                this.foot_left.getComponent(cc.RigidBody).fixedRotation = !0,
                this.foot_right.getComponent(cc.RigidBody).fixedRotation = !0),
                gl.emitter.emit("event_fireBullet", {
                    pos: t,
                    velocity: cc.v2(a, c)
                })
            },
            dance: function() {
                var e = this;
                console.log("\u8df3\u821e"),
                this.danceTimer = setInterval(function() {
                    e.direction = !e.direction;
                    e.direction ? (e.hand_right.getComponent(cc.RigidBody).applyForce(cc.v2(0, 200), e.hand_right.position),
                    e.hand_left.getComponent(cc.RigidBody).applyForce(cc.v2(0, -200), e.hand_right.position)) : (e.hand_right.getComponent(cc.RigidBody).applyForce(cc.v2(0, -200), e.hand_right.position),
                    e.hand_left.getComponent(cc.RigidBody).applyForce(cc.v2(0, 200), e.hand_right.position))
                }, 200)
            },
            cleanTimeOut: function() {
                this.danceTimer && (clearTimeout(this.danceTimer),
                this.danceTimer = null)
            },
            raiseHand: function() {
                if (this.handBody) {
                    var e = Math.atan2(this._velocity.y, this._velocity.x)
                      , t = 600 * Math.cos(e)
                      , i = 600 * Math.sin(e);
                    this.handBody && this.handBody.applyForceToCenter(cc.v2(t, i))
                }
            },
            Blasting: function(e) {
                var t = this.node.getChildByName("body").getComponent(cc.RigidBody)
                  , i = 500 * (t.node.x - e.pos.x)
                  , n = 500 * (t.node.y - e.pos.y);
                t && t.applyForceToCenter(cc.v2(i, n), !0),
                gl.userinfo.get("isWin") || 0 == gl.userinfo.shield && this.unclothe()
            },
            unclothe: function() {
                this.node.getChildByName("body").children[0].active = !1,
                this.node.getChildByName("leg").children[0].active = !1,
                this.node.getChildByName("arm_left").children[0].active = !1,
                this.node.getChildByName("hand_left").children[0].active = !1,
                this.node.getChildByName("arm_right").children[0].active = !1,
                this.node.getChildByName("hand_righ").children[0].active = !1,
                this.node.getChildByName("foot_left").children[0].active = !1,
                this.node.getChildByName("foot_right").children[0].active = !1,
                this.maozi.getComponent(cc.WeldJoint) && this.maozi.getComponent(cc.WeldJoint).enabled && (this.maozi.getComponent(cc.WeldJoint).enabled = !1)
            },
            update: function(e) {
                this.isTouch && this.raiseHand()
            },
            onDestroy: function() {
                this.cleanTimeOut(),
                gl.emitter.off("event_gameOver", this),
                gl.emitter.off("event_gameWin", this),
                gl.emitter.off("event_offshield", this),
                gl.emitter.off("event_blasting", this)
            }
        }),
        cc._RF.pop()
    }
    , {}],
    sha1: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "8d195JHHOFGM49kpelDcipF", "sha1");
        var n = cc.Class({
            name: "sha1",
            hex_sha1: function(e) {
                return this.binb2hex(this.core_sha1(this.str2binb(e), 8 * e.length))
            },
            b64_sha1: function(e) {
                return this.binb2b64(this.core_sha1(this.str2binb(e), 8 * e.length))
            },
            str_sha1: function(e) {
                return this.binb2str(this.core_sha1(this.str2binb(e), 8 * e.length))
            },
            hex_hmac_sha1: function(e, t) {
                return this.binb2hex(this.core_hmac_sha1(e, t))
            },
            b64_hmac_sha1: function(e, t) {
                return this.binb2b64(this.core_hmac_sha1(e, t))
            },
            str_hmac_sha1: function(e, t) {
                return this.binb2str(this.core_hmac_sha1(e, t))
            },
            sha1_vm_test: function() {
                return "a9993e364706816aba3e25717850c26c9cd0d89d" == this.hex_sha1("abc")
            },
            core_sha1: function(e, t) {
                e[t >> 5] |= 128 << 24 - t % 32,
                e[15 + (t + 64 >> 9 << 4)] = t;
                for (var i = Array(80), n = 1732584193, o = -271733879, s = -1732584194, a = 271733878, c = -1009589776, r = 0; r < e.length; r += 16) {
                    for (var l = n, h = o, u = s, d = a, g = c, f = 0; f < 80; f++) {
                        i[f] = f < 16 ? e[r + f] : this.rol(i[f - 3] ^ i[f - 8] ^ i[f - 14] ^ i[f - 16], 1);
                        var p = this.safe_add(this.safe_add(this.rol(n, 5), this.sha1_ft(f, o, s, a)), this.safe_add(this.safe_add(c, i[f]), this.sha1_kt(f)));
                        c = a,
                        a = s,
                        s = this.rol(o, 30),
                        o = n,
                        n = p
                    }
                    n = this.safe_add(n, l),
                    o = this.safe_add(o, h),
                    s = this.safe_add(s, u),
                    a = this.safe_add(a, d),
                    c = this.safe_add(c, g)
                }
                return Array(n, o, s, a, c)
            },
            sha1_ft: function(e, t, i, n) {
                return e < 20 ? t & i | ~t & n : e < 40 ? t ^ i ^ n : e < 60 ? t & i | t & n | i & n : t ^ i ^ n
            },
            sha1_kt: function(e) {
                return e < 20 ? 1518500249 : e < 40 ? 1859775393 : e < 60 ? -1894007588 : -899497514
            },
            core_hmac_sha1: function(e, t) {
                var i = this.str2binb(e);
                i.length > 16 && (i = this.core_sha1(i, 8 * e.length));
                for (var n = Array(16), o = Array(16), s = 0; s < 16; s++)
                    n[s] = 909522486 ^ i[s],
                    o[s] = 1549556828 ^ i[s];
                var a = this.core_sha1(n.concat(this.str2binb(t)), 512 + 8 * t.length);
                return this.core_sha1(o.concat(a), 672)
            },
            safe_add: function(e, t) {
                var i = (65535 & e) + (65535 & t);
                return (e >> 16) + (t >> 16) + (i >> 16) << 16 | 65535 & i
            },
            rol: function(e, t) {
                return e << t | e >>> 32 - t
            },
            str2binb: function(e) {
                for (var t = Array(), i = 0; i < 8 * e.length; i += 8)
                    t[i >> 5] |= (255 & e.charCodeAt(i / 8)) << 24 - i % 32;
                return t
            },
            binb2str: function(e) {
                for (var t = "", i = 0; i < 32 * e.length; i += 8)
                    t += String.fromCharCode(e[i >> 5] >>> 24 - i % 32 & 255);
                return t
            },
            binb2hex: function(e) {
                for (var t = "0123456789abcdef", i = "", n = 0; n < 4 * e.length; n++)
                    i += t.charAt(e[n >> 2] >> 8 * (3 - n % 4) + 4 & 15) + t.charAt(e[n >> 2] >> 8 * (3 - n % 4) & 15);
                return i
            },
            binb2b64: function(e) {
                for (var t = "", i = 0; i < 4 * e.length; i += 3)
                    for (var n = (e[i >> 2] >> 8 * (3 - i % 4) & 255) << 16 | (e[i + 1 >> 2] >> 8 * (3 - (i + 1) % 4) & 255) << 8 | e[i + 2 >> 2] >> 8 * (3 - (i + 2) % 4) & 255, o = 0; o < 4; o++)
                        8 * i + 6 * o > 32 * e.length ? t += "" : t += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(n >> 6 * (3 - o) & 63);
                return t
            }
        });
        t.exports = new n,
        cc._RF.pop()
    }
    , {}],
    start: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "84522CbYpZP8bvciPIvLa81", "start"),
        cc.Class({
            extends: cc.Component,
            properties: {
                node_bg: cc.Node,
                node_role: cc.Node,
                node_light: cc.Node,
                node_color: [cc.Node],
                prefab_selectRole: cc.Prefab,
                prefab_selectScene: cc.Prefab,
                prefab_shareConcern: cc.Prefab,
                prefab_lookRank: cc.Prefab,
                prefab_notice: cc.Prefab,
                prefab_light: cc.Prefab,
                prefab_hintFrame: cc.Prefab,
                prefab_loading: cc.Prefab,
                prefab_hourseRace: cc.Prefab,
                label_stamina: cc.Label,
                label_staminatime: cc.Label,
                ActWechat: cc.Animation,
                audio_bg: cc.AudioClip,
                img_audio: [cc.Node],
                node_flag: [cc.Node],
                node_addWechat: cc.Node,
                btn_service: cc.Node,
                layBox: cc.Node
            },
            onLoad: function() {
                gl.userinfo.isWeChat ? (gl.userinfo.enter ? "" == gl.userinfo.wechatadUnitId ? (gl.userinfo.reqGainAdId(),
                this.initHorseRace()) : this.initHorseRace() : (this.addLoading(),
                this.initData()),
                gl.wechat.showGameClub()) : gl.userinfo.enter || (this.addLoading(),
                gl.levelArr || this.initData()),
                this.initWnd(),
                gl.emitter.on("event_nostamina", this.noStamina, this),
                gl.emitter.on("event_refreshrole", this.refreshRole, this),
                gl.emitter.on("event_gamesenter", this.gamesenter, this),
                gl.emitter.on("event_refreshstamina", this.refreshStamina, this),
                gl.emitter.on("event_login", this.login, this),
                gl.emitter.on("event_showHorseRace", this.initHorseRace, this),
                this.loadGameScene(),
                this.loadGameScene(),
                this.initAudio();
				
				//埋点 需要改造成 更多好玩
				var btn_interesting = cc.find("btn_interesting", this.node);
				btn_interesting.active = 0;
				console.log(this.node);
            },
            initData: function() {
                gl.readJSON("jdqsData").then(function(e) {
                    gl.levelArr = e,
                    gl.userinfo.set("pointCount", e.length - 1),
                    gl.userinfo.wechat_StartGame()
                })
            },
            initAudio: function() {
                if (this.audio_open = 1 === gl.audio.open,
                gl.audio.playMusic(this.audio_bg),
                this.img_audio[0].active = this.audio_open,
                this.img_audio[1].active = !this.audio_open,
                !gl.userinfo.wechatflag)
                    for (var e in this.node_flag) {
                        this.node_flag[e].active = !1
                    }
            },
            loadGameScene: function() {
                var e = this;
                this.gamecut = !0,
                new Promise(function(e, t) {
                    cc.director.preloadScene("game", function(t, i) {
                        if (!t)
                            return e();
                        console.error(t)
                    })
                }
                ).then(function() {
                    e.gamecut = !0
                })
            },
            login: function() {
                if (gl.userinfo.isWeChat && (gl.userinfo.reqHorseRaceLamp(),
                !gl.userinfo.wechatflag))
                    for (var e in this.node_flag) {
                        this.node_flag[e].active = !1
                    }
                this.initNotice();
                var t = gl.userinfo.get("skinList")
                  , i = Number(gl.userinfo.get("role"));
                if (console.log("\u76ae\u80a4\u4fe1\u606f", t, i),
                gl.userinfo.isWeChat) {
                    var n = gl.userinfo.lockPoint
                      , o = Number(gl.userinfo.hadPass);
                    (!t[i + 1] || o + 1 < n[i]) && (gl.userinfo.set("role", 0),
                    i = 0),
                    this.refreshRole()
                }
            },
            initNotice: function() {
                var e = gl.userinfo.get("bulletin");
                (console.log("\u516c\u544a\u8be6\u60c5", e),
                e && e.content) && (cc.instantiate(this.prefab_notice).parent = this.node)
            },
            initHorseRace: function() {
                var e = gl.userinfo.get("horseRace");
                e && 0 != e.length && (cc.instantiate(this.prefab_hourseRace).parent = this.node)
            },
            initWnd: function() {
                gl.color_index = parseInt(3 * Math.random() + 0),
                gl.userinfo.isWeChat || (this.node_addWechat.active = !1,
                this.btn_service.active = !1),
                this.node_bg.color = gl.bottom_color[gl.color_index];
                for (var e = 1; e <= 2; e++) {
                    this.node_bg.getChildByName("img_ztop" + e).color = gl.light_color[gl.color_index],
                    this.node_bg.getChildByName("img_zdown" + e).color = gl.light_color[gl.color_index]
                }
                this.refreshRole();
                var t = cc.instantiate(this.prefab_light);
                for (var i in t.parent = this.node_light,
                t.scaleX = 1.3,
                t.scaleY = 1.05,
                this.node_color) {
                    this.node_color[i].color = gl.button_color[gl.color_index]
                }
                this.refreshStamina()
            },
            refreshStamina: function() {
                this.label_stamina.string = "" + gl.userinfo.get("stamina")
            },
            refreshRole: function() {
                var e = this
                  , t = gl.userinfo.get("role");
                cc.loader.loadResDir("/dragon/dragon_role" + (t + 1), function(t, i) {
                    var n = e.node_role.getComponent(dragonBones.ArmatureDisplay);
                    for (var o in i)
                        i[o]instanceof dragonBones.DragonBonesAsset && (n.dragonAsset = i[o]),
                        i[o]instanceof dragonBones.DragonBonesAtlasAsset && (n.dragonAtlasAsset = i[o])
                })
            },
            addLoading: function() {
                cc.instantiate(this.prefab_loading).parent = this.node
            },
            selectScene: function() {
                cc.instantiate(this.prefab_selectScene).parent = this.node
            },
            selectRole: function() {
                cc.instantiate(this.prefab_selectRole).parent = this.node
            },
            sceneEditor: function() {
                cc.director.loadScene("editor")
            },
            shareConcern: function() {
                cc.instantiate(this.prefab_shareConcern).parent = this.node
            },
            addStamina: function() {
                gl.userinfo.isWeChat && gl.userinfo.wechatflag ? (console.log("\u5206\u4eab\u6b21\u65703", gl.userinfo.sharecount, gl.userinfo.wechatadUnitId),
                0 == gl.userinfo.sharecount && "" != gl.userinfo.wechatadUnitId ? (gl.failVideo = function() {
                    gl.userinfo.reqGetShareStamina()
                }
                ,
                gl.wechat.showRewardVideoAd(function() {
                    console.log("\u5206\u4eab\u8d70\u54ea\u91cc1"),
                    gl.userinfo.reqStamina(2, "", ""),
                    gl.userinfo.wechatflag && gl.wechat.shareAppMessages()
                }, function() {
                    gl.wechat.shareAppMessages()
                })) : (console.log("\u5206\u4eab\u8d70\u54ea\u91cc2"),
                gl.userinfo.reqGetShareStamina())) : this.noStamina()
            },
            faildSeeVideo: function() {
                gl.userinfo.reqGetShareStamina()
            },
            lookRank: function() {
                cc.instantiate(this.prefab_lookRank).parent = this.node
            },
            noStamina: function() {
                cc.instantiate(this.prefab_hintFrame).parent = this.node
            },
            gamesenter: function() {
                this.gamecut ? cc.director.loadScene("game") : console.error("cutgame", this.gamecut)
            },
            onButton: function(e) {
                switch (e.target.name) {
                case "btn_start":
                    if (this.selectScene(),
                    !gl.userinfo.isWeChat)
                        break;
                    gl.wechat.hideBannerAd();
                    break;
                case "btn_selectRole":
                    if (this.selectRole(),
                    !gl.userinfo.isWeChat)
                        break;
                    gl.wechat.hideBannerAd();
                    break;
                case "btn_interesting":
                    if (this.shareConcern(),
                    !gl.userinfo.isWeChat)
                        break;
                    gl.wechat.hideBannerAd();
                    break;
                case "btn_rank":
                    if (this.lookRank(),
                    !gl.userinfo.isWeChat)
                        break;
                    gl.wechat.hideBannerAd();
                    break;
                case "btn_stamina":
                    this.addStamina();
                    break;
                case "btn_service":
                    if (!gl.userinfo.isWeChat)
                        break;
                    gl.wechat.openCustomerServiceConversation();
                    break;
                case "btn_snFight":
                    gl.showTip("\u8fd8\u672a\u5f00\u653e\u656c\u8bf7\u671f\u5f85\uff01");
                    break;
                case "btn_audio":
                    this.audio_open = !this.audio_open,
                    this.img_audio[0].active = this.audio_open,
                    this.img_audio[1].active = !this.audio_open,
                    gl.audio.setOpen()
                }
                gl.audio.clickPlay()
            },
            update: function(e) {
                this.label_staminatime && (this.label_staminatime.string = gl.userinfo.getStaminaTime()),
                this.refreshStamina()
            },
            onDestroy: function() {
                gl.emitter.off("event_refreshrole", this),
                gl.emitter.off("event_nostamina", this),
                gl.emitter.off("event_gamesenter", this),
                gl.emitter.off("event_refreshstamina", this),
                gl.emitter.off("event_login", this),
                gl.emitter.off("event_showHorseRace", this),
                gl.audio.stopMusic()
            }
        }),
        cc._RF.pop()
    }
    , {}],
    userinfo: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "dc6dd4TGyZO15HofpmBRabl", "userinfo");
        var n = 2
          , o = 1
          , s = cc.Class({
            name: "userinfo",
            properties: {},
            ctor: function() {
                this.isWeChat = !1,
                this.isOrgainMap = !1,
                this.isDevelop = !0,
                this.isAndroid = !1,
                this.enter = !1,
                this.serverDelay = 0,
                this.wechatflag = 1,
                this.wechatadUnitId = "",
                this.wcappid = "",
                this.tpadunitlist = [],
                this.guidanceState = 5,
                this.shieldVideoCount = 0,
                this.shieldVideoMax = 0,
                this.userid = "",
                this.usericon = "",
                this.username = "",
                this.sendWechat = {},
                this.bulletin = {},
                this.horseRace = null,
                this.stamina = 10,
                this.staminaTime = 0,
                this.sharecount = 0,
                this.skinList = {
                    0: 1,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7
                },
                this.totalStar = 0,
                this.starList = {},
                this.starCondition = null,
                this.pointCount = 19,
                this.checkPoint = 0,
                this.time = 0,
                this.gametime = 0,
                this.hadPass = 0,
                this.role = 0,
                this.blueCount = 0,
                this.sceneSize = cc.winSize,
                this.sorce = 0,
                this.shootCount = 0,
                this.playerPos = null,
                this.isWin = null,
                this.shield = 0,
                this.shieldMax = 3,
                this.rank_type = 0,
                this.rank_page = 1,
                this.pointRank = [],
                this.friendRank = [],
                this.ownerRank = [],
                this.userRank = {},
                this.gasSpeed = 600,
                this.bulletSpeed = 1300,
                this.BODYTAG = {
                    BOARD: 0,
                    PLAYER: 1,
                    GLASS: 2,
                    BULEGLASS: 3,
                    LIGHT: 4,
                    LIGHTCONNECT: 5,
                    TV: 6,
                    MOS: 7,
                    GAS: 8,
                    BULEGLASSBIG: 9,
                    WALL: 10
                },
                this.PLAYERTAG = {
                    HATS: 20
                },
                this.intro = {
                    0: "\u7cbe\u7075\u738b\u5b50\uff0c\u5c04\u7bad\u6280\u672f\u4e00\u6d41\uff0c\u4f46\u662f\u6253\u624b\u67aa\u66f4\u725b\u903c\u3002",
                    1: "\u68a6\u60f3\u5c04\u672f\u7edd\u9876\uff0c\u63a5\u7740\u62ff\u5230\u4e00\u4e2a\u5c04\u51fb\u7684\u51a0\u519b\u3002",
                    2: "\u4ee5\u524d\u6253\u98de\u673a\u7684\u5c04\u51fb\u5f88\u51c6\uff0c\u73b0\u5728\u559c\u6b22\u5c04\u84dd\u8272\u7684\u74f6\u5b50\u3002",
                    3: "\u4e00\u628a\u5c06\u7535\u8111\u7838\u5728\u8001\u677f\u684c\u4e0a\uff0c\u62ff\u8d77\u62bd\u5c49\u91cc\u7684\u67aa\u8d70\u4e86\u3002",
                    4: "\u68a6\u60f3\u6210\u4e3a\u9976\u820c\u9ad8\u624b\u7684\u4e2d\u5e74\u7537\u5b50\uff0c\u5728\u4e00\u573a\u88ab\u5632\u7b11\u7684\u8868\u6f14\u540e\u4e3e\u8d77\u4e86\u67aa\u3002",
                    5: "\u5c11\u5973\u5fc3\u4e0d\u8db3\u4ee5\u652f\u6491\u81ea\u5df1\u559c\u597d\uff0c\u53ea\u80fd\u7528\u67aa\u634d\u536b\u3002",
                    6: "\u4e0d\u7518\u5bc2\u5bde\u7684\u5b59\u5927\u5723\u4e71\u5165\uff0c\u624b\u6301\u767e\u53d8\u5175\u5668\uff0cbiubiubiu"
                },
                this.lockPoint = {
                    0: 0,
                    1: 0,
                    2: 10,
                    3: 20,
                    4: 30,
                    5: 40,
                    6: 50,
                    7: 60
                },
                this.starLev = {
                    10: {
                        lev1: 9999,
                        lev2: 9999
                    },
                    30: {
                        lev1: 20,
                        lev2: 40
                    },
                    50: {
                        lev1: 30,
                        lev2: 50
                    },
                    70: {
                        lev1: 40,
                        lev2: 60
                    },
                    100: {
                        lev1: 50,
                        lev2: 70
                    }
                }
            },
            onLoad: function() {
                gl.emitter.on("event_servsertime", this.setServerTime, this),
                this.userInfoGain(),
                this.testRank();
                var e = parseInt(this.readData(gl.role_key));
                6 != e && 5 != e && 4 != e && 3 != e && 2 != e && 1 != e && 0 != e || (this.role = e),
                this.readdata()
            },
            initData: function() {
                this.sorce = 0,
                this.shootCount = 0,
                this.playerPos = null,
                this.isWin = null
            },
            posChnange: function(e) {
                return this.sceneSize = cc.winSize,
                cc.v2(e.x - this.sceneSize.width / 2, e.y - this.sceneSize.height / 2)
            },
            storageData: function(e, t) {
                cc.sys.localStorage.setItem(e, t)
            },
            readData: function(e) {
                return cc.sys.localStorage.getItem(e)
            },
            cunshuju: function() {},
            getdate: function(e, t, i) {
                var n = cc.sys.localStorage.getItem(e)
                  , o = "";
                return "" == n || null == n ? o = i : 0 == t ? o = parseInt(n) : 1 == t ? o = n : 2 == t && (o = n),
                o
            },
            readdata: function() {
                var e = this.getdate("guidanceState", 0, 5);
                gl.userinfo.set("guidanceState", e),
                e = this.getdate("shieldVideoCount", 0, 0),
                gl.userinfo.set("shieldVideoCount", e),
                e = this.getdate("shieldVideoMax", 0, 0),
                gl.userinfo.set("shieldVideoMax", e),
                e = this.getdate("userid", 1, "999990-"),
                gl.userinfo.set("userid", e),
                e = this.getdate("usericon", 1, "99999icon"),
                gl.userinfo.set("usericon", e),
                e = this.getdate("username", 1, "99999name"),
                gl.userinfo.set("username", e),
                gl.userinfo.set("sendWechat", ""),
                gl.userinfo.set("bulletin", ""),
                gl.userinfo.set("horseRace", ""),
                gl.userinfo.set("sharecount", 0),
                e = this.getdate("stamina", 0, 10),
                gl.userinfo.set("stamina", e),
                e = this.getdate("staminaTime", 0, 0),
                gl.userinfo.set("staminaTime", e);
                var t = {
                    0: 1,
                    1: 1,
                    2: 2,
                    3: 3,
                    4: 4,
                    5: 5,
                    6: 6,
                    7: 7
                };
                e = this.getdate("skinList", 2, t),
                gl.userinfo.set("skinList", t),
                e = this.getdate("totalStar", 0, 0),
                gl.userinfo.set("totalStar", e),
                t = "",
                e = this.getdate("starList", 2, t),
                console.log(" starList zhi:  " + e),
                t = "" != e && e != t ? JSON.parse(e) : [],
                console.log(" starList set zhi:  " + t),
                gl.userinfo.set("starList", t),
                e = this.getdate("starCondition", 0, 0),
                gl.userinfo.set("starCondition", e),
                e = this.getdate("pointCount", 0, 0),
                gl.userinfo.set("pointCount", e),
                e = this.getdate("hadPass", 0, 0),
                gl.userinfo.set("hadPass", e),
                e = this.getdate("checkPoint", 0, 0),
                gl.userinfo.set("checkPoint", e),
                console.log("\u521d\u59cb\u5316 ok")
            },
            userInfoGain: function() {},
            getStrTime: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.gametime
                  , t = Math.floor(e / 3600)
                  , i = Math.floor(e % 3600 / 60)
                  , n = e % 60;
                return (t > 9 ? "" : "0") + t + ":" + (i > 9 ? "" : "0") + i + ":" + (n > 9 ? "" : "0") + n
            },
            getStaminaTime: function() {
                if (0 == this.staminaTime)
                    return "";
                var e = Math.floor(Date.now() / 1e3)
                  , t = Math.max(e - this.staminaTime, 0);
                Math.floor(t / 60);
                if (t >= 300) {
                    var i = gl.userinfo.get("stamina");
                    i < 10 && (i += 1,
                    gl.userinfo.set("stamina", i)),
                    i >= 10 ? gl.userinfo.set("staminaTime", 0) : gl.userinfo.set("staminaTime", e)
                }
                var n = 300 - t
                  , o = Math.floor(n / 60)
                  , s = n % 60;
                return (o > 9 ? "" : "0") + o + ":" + (s > 9 ? "" : "0") + s
            },
            clearRankPoint: function() {
                this.pointRank = []
            },
            setServerTime: function(e) {
                this.serverDelay = e - Math.floor(Date.now() / 1e3)
            },
            setStaminaTime: function(e) {
                this.staminaTime = e ? e + this.serverDelay + 1 : 0,
                gl.userinfo.set("staminaTime", this.staminaTime)
            },
            getThirdpartyData: function() {
                return this.tpadunitlist && this.tpadunitlist.app_page ? this.tpadunitlist.app_page : []
            },
            getThirdpartyCb: function() {
                return this.tpadunitlist && this.tpadunitlist.app_cb ? this.tpadunitlist.app_cb : []
            },
            getThirdpartyEnter: function() {
                return this.tpadunitlist && this.tpadunitlist.app_box ? this.tpadunitlist.app_box : []
            },
            wechat_StartGame: function() {
                var e = this;
                if (!this.isWeChat)
                    return gl.userinfo.enter = !0,
                    gl.emitter.emit("event_login");
                gl.wechat.setKeepScreenOn(),
                gl.wechat.login().then(function(t) {
                    return console.log("wechat_StartGame1", t),
                    e.sendWechat.wccode = t.code,
                    e.sendWechat.wckey = gl.wechat_rank_key,
                    gl.wechat.getUserInfo()
                }).then(function(t) {
                    e.usericon = t.userInfo.avatarUrl,
                    e.username = t.userInfo.nickName,
                    console.log("wechat_StartGame2", t),
                    e.sendWechat.wcencrypted = t.encryptedData,
                    e.sendWechat.wciv = t.iv,
                    e.sendWechat.appid = e.wcappid,
                    e.reqGetUser()
                })
            },
            reqGetUser: function() {
                gl.emitter.emit("event_startlogin"),
                gl.network.send("http.reqGetUser", this.sendWechat, this.http_reqGetUser.bind(this))
            },
            http_reqGetUser: function(e, t) {
                var i = this;
                console.log("\u767b\u5f55\u6210\u529f", t),
                this.userid = t.openid,
                this.stamina = t.stamina,
                this.hadPass = t.pointid,
                this.sharecount = t.sharecount,
                this.wechatadUnitId = t.adunitlist.video,
                this.bulletin = t.bulletin,
                this.horseRace = t.lamp,
                this.shieldVideoCount = t.shieldcount || 0,
                this.shieldVideoMax = t.shieldmax || 5,
                this.skinList = t.skinList,
                gl.wechat.createRewardedVideoAd(this.wechatadUnitId),
                this.setStaminaTime(t.staminatime),
                this.tpadunitlist = t.thirdpartydata,
                this.enter = !0,
                gl.network.send("http.reqGetStar", {}, function(e, t) {
                    console.log("\u661f\u7ea7\u4fe1\u606f=", t),
                    i.starList = t.data,
                    i.totalStar = Number(t.data.total),
                    gl.emitter.emit("event_login"),
                    gl.emitter.emit("event_refreshstamina"),
                    i.reqGetInitShare()
                })
            },
            reqHorseRaceLamp: function() {
                gl.network.send("http.reqHorseRaceLamp", {}, this.http_reqHorseRaceLamp.bind(this))
            },
            http_reqHorseRaceLamp: function(e, t) {
                if (!t.state)
                    return cc.error("\u8dd1\u9a6c\u706f\u83b7\u53d6\u9519\u8bef" + JSON.stringify(t));
                this.horseRace = t.data,
                gl.emitter.emit("event_showHorseRace")
            },
            reqGainAdId: function() {
                gl.network.send("http.reqGainAdId", {}, this.http_reqGainAdId.bind(this))
            },
            http_reqGainAdId: function(e, t) {
                this.wechatadUnitId = t.adunitlist.video
            },
            reqGetInitShare: function() {
                gl.network.send("http.reqGetShare", {}, this.http_reqGetInitShare.bind(this))
            },
            http_reqGetInitShare: function(e, t) {
                "" != t.purl && "" != t.title ? gl.wechat.onShareAppMessage(t.title, t.purl) : gl.wechat.onShareAppMessage()
            },
            reqGetShareStamina: function() {
                gl.network.send("http.reqGetShare", {}, this.http_reqGetShareStamina.bind(this))
            },
            http_reqGetShareStamina: function(e, t) {
                var i = this;
                "" != t.title && (gl.SHARE_TITLE = t.title),
                "" != t.purl && (gl.SHARE_PICURL = t.purl),
                gl.wechat.shareAppMessages(),
                gl.backCb = function() {
                    i.reqStamina(4, null, null)
                }
                ,
                gl.failCb = function() {
                    gl.showTip("\u5206\u4eab\u5931\u8d25")
                }
            },
            reqSkipApp: function(e) {
                gl.network.send("http.reqSkipApp", {
                    to_id: e
                }, function() {
                    console.log("chenggong")
                })
            },
            reqGetVideoRevive: function() {
                var e = this;
                this.shieldVideoCount < this.shieldVideoMax ? (gl.failVideo = function() {
                    e.reqGetShareRevive()
                }
                ,
                gl.wechat.showRewardVideoAd(function() {
                    e.shield = e.shieldMax,
                    e.shieldVideoCount++,
                    e.reqEnterPoint(!0)
                })) : this.reqGetShareRevive()
            },
            reqGetShareRevive: function() {
                gl.network.send("http.reqGetShare", {}, this.http_reqGetShareRevive.bind(this))
            },
            http_reqGetShareRevive: function(e, t) {
                var i = this;
                "" != t.title && (gl.SHARE_TITLE = t.title),
                "" != t.purl && (gl.SHARE_PICURL = t.purl),
                console.log("http_reqGetShare", t),
                gl.wechat.shareAppMessages(),
                gl.backCb = function() {
                    i.shieldVideoCount++,
                    i.shield = i.shieldMax,
                    i.reqEnterPoint(!0)
                }
                ,
                gl.failCb = function() {
                    gl.showTip("\u5206\u4eab\u5931\u8d25")
                }
            },
            reqEnterPoint: function(e) {
                var t = this.checkPoint + 1;
                for (var i in this.starLev)
                    if (t <= Number(i)) {
                        this.starCondition = this.starLev[i];
                        break
                    }
                this.stamina--,
                gl.userinfo.set("stamina", this.stamina);
                var n = Math.floor(Date.now() / 1e3);
                this.setStaminaTime(n),
                this.cunguanka(),
                gl.emitter.emit("event_gamesenter")
            },
            http_reqEnterPoint: function(e, t) {
                this.stamina = t.stamina,
                this.setStaminaTime(t.staminatime),
                gl.emitter.emit("event_gamesenter")
            },
            reqPointSubmit: function(e, t) {
                if (this.isWeChat) {
                    var i = {
                        pointid: e,
                        finishtime: t
                    };
                    gl.network.send("http.reqPointSubmit", i, this.http_reqPointSubmit.bind(this))
                }
            },
            http_reqPointSubmit: function() {
                this.reqPointRank(1, gl.userinfo.get("checkPoint"))
            },
            reqGainStamina: function() {
                gl.network.send("http.reqGainStamina", {}, this.http_reqGainStamina.bind(this))
            },
            http_reqGainStamina: function(e, t) {
                console.log("\u5f53\u524d\u4f53\u529b\u503c", t),
                this.stamina = t.stamina,
                this.setStaminaTime(t.staminatime),
                gl.emitter.emit("event_refreshstamina")
            },
            reqStamina: function(e, t, i) {
                gl.network.send("http.reqStamina", {
                    type: e,
                    encrypted: t,
                    iv: i
                }, this.http_reqStamina.bind(this))
            },
            http_reqStamina: function(e, t) {
                console.log("\u5206\u4eab\u56de\u8c03data", t),
                this.stamina = t.stamina,
                this.sharecount = t.sharecount,
                console.log("\u5206\u4eab\u6b21\u65702", this.sharecount, t.sharecount),
                this.setStaminaTime(t.staminatime),
                gl.showTip("\u4f53\u529b\u5df2\u6dfb\u52a0"),
                gl.emitter.emit("event_refreshstamina")
            },
            reqPointRank: function(e, t) {
                this.reqGetRank(n, e, t, 3)
            },
            reqOwnerRank: function(e, t) {
                this.rank_page = e,
                this.reqGetRank(o, e, 0, t)
            },
            reqGetRank: function(e, t) {
                var i = {
                    type: e,
                    page: t,
                    point: arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1,
                    sum: arguments[3]
                };
                this.rank_type = e,
                gl.network.send("http.reqGetRank", i, this.http_reqGetRank.bind(this))
            },
            http_reqGetRank: function(e, t) {
                switch (console.log("\u6392\u884c\u699c\u8be6\u60c5", t),
                this.rank_type) {
                case n:
                    this.pointRank = t.rank_list,
                    this.userRank = t.player_rank,
                    this.starList[this.userRank.pointid] = this.userRank.star,
                    this.totalStar = this.userRank.star_total,
                    this.userRank.nickname = this.username,
                    this.userRank.avatar = this.usericon,
                    gl.emitter.emit("event_refreshprank"),
                    this.upScoreToWx(this.userRank.pointid, this.userRank.finishtime, this.userRank.star_total);
                    break;
                case o:
                    1 == this.rank_page ? (this.userRank = t.player_rank,
                    this.userRank.nickname = this.username,
                    this.userRank.avatar = this.usericon,
                    this.ownerRank = [],
                    this.ownerRank = t.rank_list,
                    gl.emitter.emit("event_rankuser"),
                    gl.emitter.emit("event_ownerrank")) : (t.rank_list.length && (this.ownerRank = this.ownerRank.concat(t.rank_list)),
                    gl.emitter.emit("event_ownerrank"))
                }
            },
            upScoreToWx: function(e, t, i) {
                gl.wechat.openDataPostMessage({
                    messageType: gl.MESSAGE_TYPE.SUBMIT_RANK,
                    MAIN_MENU_NUM: "imageJump",
                    point: e,
                    time: t,
                    totalStar: i
                })
            },
            testRank: function() {
                this.pointRank = [],
                this.userRank = {},
                this.friendRank = [],
                this.ownerRank = []
            },
            cunguanka: function() {
                console.log(" size : " + gl.userinfo.starList.length);
                for (var e = 0; e < gl.userinfo.starList.length; e++)
                    console.log(" xing: " + gl.userinfo.starList[e]);
                var t = JSON.stringify(this.starList);
                console.log("\u5b58\u5173\u5361\uff1a" + t),
                cc.sys.localStorage.setItem("starList", t)
            },
            set: function(e, t) {
                if (console.log("set:  " + e + " : " + t),
                "starList" == e) {
                    var i = JSON.stringify(t);
                    cc.sys.localStorage.setItem(e, i)
                } else
                    cc.sys.localStorage.setItem(e, t);
                this[e] = t,
                console.log(" set val : " + this[e])
            },
            get: function(e) {
                return this[e]
            }
        });
        t.exports = new s,
        cc._RF.pop()
    }
    , {}],
    wechat: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "f9758/YuLlKx4ZcQawc3n2q", "wechat");
        var n = cc.Class({
            name: "wechat",
            ctor: function() {},
            onLoad: function() {
                gl.userinfo.isWeChat && (this.wechatData = null,
                this.gameclub = null,
                this.bannerAd = [],
                this.bannerAdIndex = -1,
                this.bannerAdMax = 3,
                this.sysFileManager = wx.getFileSystemManager(),
                this.showShareMenu(),
                this.onAudioInterruptionEnd(),
                this.creatGameClub(),
                this.getLaunchOptionsSync(),
                this.createBannerAd())
            },
            copyToClip: function(e) {
                wx.setClipboardData({
                    data: e,
                    success: function() {
                        console.log("WeChatGame\u590d\u5236\u6210\u529f")
                    },
                    fail: function() {
                        console.log("WeChatGame\u590d\u5236\u5931\u8d25")
                    },
                    complete: function() {
                        console.log("WeChatGame\u590d\u5236\u5b8c\u6210")
                    }
                })
            },
            login: function() {
                return new Promise(function(e, t) {
                    var i = function() {
                        wx.login({
                            success: function(t) {
                                console.log("WeChatGame\u767b\u9646\u6210\u529f"),
                                e(t)
                            },
                            fail: function(e) {
                                console.log("WeChatGame\u767b\u9646\u5931\u8d25"),
                                t(e),
                                cc.director.end()
                            },
                            complete: function(e) {
                                console.log("WeChatGame\u767b\u9646\u5b8c\u6210")
                            }
                        })
                    };
                    gl.userinfo.isWeChat && wx.getSetting({
                        success: function(e) {
                            e.authSetting["scope.userInfo"] ? i() : wx.authorize({
                                scope: "scope.userInfo",
                                success: function() {
                                    i()
                                },
                                fail: function() {
                                    wx.showModal({
                                        title: "\u6388\u6743\u63d0\u793a",
                                        content: "\u5f53\u524d\u5c0f\u6e38\u620f\u9700\u8981\u83b7\u53d6\u60a8\u7684\u516c\u5f00\u4fe1\u606f(\u6635\u79f0\u3001\u5934\u50cf\u7b49)",
                                        success: function(e) {
                                            e.confirm && wx.openSetting({
                                                success: function() {
                                                    i()
                                                },
                                                fail: function() {
                                                    cc.director.end()
                                                }
                                            }),
                                            e.cancel && wx.exitMiniProgram({})
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
                )
            },
            getUserInfo: function() {
                return new Promise(function(e, t) {
                    wx.getUserInfo({
                        success: function(t) {
                            console.log("WeChatGame\u83b7\u53d6\u73a9\u5bb6\u4fe1\u606f\u6210\u529f"),
                            e(t)
                        },
                        fail: function(e) {
                            console.log("WeChatGame\u83b7\u53d6\u73a9\u5bb6\u4fe1\u606f\u5931\u8d25"),
                            t(e)
                        },
                        complete: function(e) {
                            console.log("WeChatGame\u83b7\u53d6\u73a9\u5bb6\u4fe1\u606f\u5b8c\u6210")
                        }
                    })
                }
                )
            },
            getLaunchOptionsSync: function() {
                this.wechatData = wx.getLaunchOptionsSync(),
                this.wechatData && this.wechatData.referrerInfo && (gl.userinfo.wcappid = this.wechatData.referrerInfo.appId || "")
            },
            onShareAppMessage: function(e, t, i) {
                return new Promise(function(n, o) {
                    wx.onShareAppMessage(function(s) {
                        return o(s),
                        {
                            title: e || gl.SHARE_TITLE,
                            imageUrl: t || gl.SHARE_PICURL,
                            query: i || "global=true",
                            success: function(e) {
                                n(e),
                                console.log("onShareAppMessage success", e)
                            },
                            fail: function(e) {
                                o(e),
                                console.log("onShareAppMessage fail", e)
                            },
                            complete: function(e) {
                                console.log("onShareAppMessage complete", e)
                            }
                        }
                    })
                }
                )
            },
            offShareAppMessage: function() {
                return new Promise(function(e, t) {
                    wx.offShareAppMessage(function() {
                        e()
                    })
                }
                )
            },
            shareAppMessage: function(e, t, i) {
                return new Promise(function(n, o) {
                    gl.userinfo.isWeChat && (console.log("shareAppMessage 2", gl.userinfo.isWeChat),
                    wx.shareAppMessage({
                        title: e,
                        imageUrl: t || "" + gl.i18n.t("remoteResPath") + cc.url.raw(gl.i18n.t("shareIconPath")),
                        query: i,
                        success: function(e) {
                            n(e),
                            console.log("shareAppMessage success", e)
                        },
                        fail: function(e) {
                            o(e),
                            console.log("shareAppMessage fail", e)
                        },
                        complete: function(e) {
                            console.log("shareAppMessage complete", e)
                        },
                        withShareTicket: !0
                    }))
                }
                )
            },
            showShareMenu: function() {
                return new Promise(function(e, t) {
                    wx.showShareMenu({
                        withShareTicket: !0,
                        success: function(t) {
                            console.log("\u663e\u793a\u5206\u4eab\u6309\u94ae\u6210\u529f", t),
                            e()
                        },
                        fail: function(e) {
                            console.log("\u663e\u793a\u5206\u4eab\u6309\u94ae\u5931\u8d25", e),
                            t()
                        },
                        complete: function(e) {
                            console.log("\u663e\u793a\u5206\u4eab\u6309\u94ae\u5b8c\u6210", e)
                        }
                    })
                }
                )
            },
            hideShareMenu: function() {
                return new Promise(function(e, t) {
                    wx.hideShareMenu({
                        success: function() {
                            console.log("\u5173\u95ed\u5206\u4eab\u6309\u94ae\u6210\u529f"),
                            e()
                        },
                        fail: function() {
                            console.log("\u5173\u95ed\u5206\u4eab\u6309\u94ae\u6210\u529f"),
                            t()
                        },
                        complete: function() {
                            console.log("\u5173\u95ed\u5206\u4eab\u6309\u94ae\u6210\u529f")
                        }
                    })
                }
                )
            },
            getShareInfo: function(e) {
                return new Promise(function(t, i) {
                    wx.getShareInfo({
                        shareTicket: e,
                        success: function(e) {
                            console.log("\u5fae\u4fe1\u83b7\u53d6\u56de\u503c\u6210\u529f"),
                            t(e)
                        },
                        fail: function(e) {
                            console.log("\u5fae\u4fe1\u83b7\u53d6\u56de\u503c\u5931\u8d25"),
                            i(e)
                        },
                        complete: function() {
                            console.log("\u5fae\u4fe1\u83b7\u53d6\u56de\u503c\u5b8c\u6210")
                        }
                    })
                }
                )
            },
            shareAppMessages: function(e) {
                var t = this;
                this.shareAppMessage(gl.SHARE_TITLE, gl.SHARE_PICURL, "login=true").then(function(i) {
                    i.shareTickets && i.shareTickets[0] ? t.getShareInfo(i.shareTickets[0]).then(function(t) {
                        e(t)
                    }) : gl.showTip("\u8bf7\u5206\u4eab\u5230\u597d\u53cb\u7fa4")
                })
            },
            shareClubRank: function(e) {
                var t = this;
                gl.userinfo.isWeChat && this.shareAppMessage(gl.SHARE_TITLE, gl.SHARE_PICURL, "login=true").then(function(i) {
                    i.shareTickets && i.shareTickets[0] ? (e(),
                    t.openDataPostMessage({
                        messageType: gl.MESSAGE_TYPE.GAIN_CLUB,
                        MAIN_MENU_NUM: gl.wechat_rank_key,
                        share: i.shareTickets[0]
                    })) : gl.showTip("\u8bf7\u5206\u4eab\u5230\u597d\u53cb\u7fa4")
                })
            },
            openDataPostMessage: function(e) {
                gl.userinfo.isWeChat && wx.getOpenDataContext().postMessage(e)
            },
            createBannerAd: function() {
                for (var e = this, t = wx.getSystemInfoSync(), i = {
                    width: 600 / t.pixelRatio,
                    height: 150 / t.pixelRatio
                }, n = function(n) {
                    e.bannerAd.push(wx.createBannerAd({
                        adUnitId: "adunit-c850a67b7e658e84",
                        style: {
                            left: t.windowWidth / 2 - i.width / 2,
                            top: t.windowHeight - i.height - .1 * t.windowHeight,
                            width: i.width
                        }
                    })),
                    e.bannerAd[n].onResize(function(i) {
                        gl.bannerSize[n] = {
                            width: i.width,
                            height: i.height,
                            winHeight: t.windowHeight
                        },
                        e.bannerAd[n].style.left = t.windowWidth / 2 - i.width / 2,
                        e.bannerAd[n].style.top = t.windowHeight - i.height + .1
                    }),
                    e.bannerAd[n].onLoad(function() {
                        console.log("banner \u5e7f\u544a\u52a0\u8f7d\u6210\u529f ...")
                    }),
                    e.bannerAd[n].onError(function(e) {
                        console.error("banner \u5e7f\u544a\u521b\u5efa\u5931\u8d25 ...", e)
                    })
                }, o = 0; o < this.bannerAdMax; o++)
                    n(o)
            },
            showBannerAd: function() {
                if (gl.userinfo.isWeChat) {
                    -1 == this.bannerAdIndex && (this.bannerAdIndex = parseInt(100 * Math.random()) % this.bannerAdMax);
                    var e = this.bannerAd[this.bannerAdIndex];
                    e && (gl.bannerIndex = this.bannerAdIndex,
                    e.show().catch(function(e) {
                        console.error("banner \u5e7f\u544a\u663e\u793a\u5931\u8d25", e)
                    }))
                }
            },
            hideBannerAd: function() {
                if (gl.userinfo.isWeChat) {
                    var e = this.bannerAd[this.bannerAdIndex];
                    e && (e.hide().catch(function(e) {
                        console.error("banner \u5e7f\u544a\u9690\u85cf\u5931\u8d25", e)
                    }),
                    this.bannerAdIndex = -1)
                }
            },
            createRewardedVideoAd: function(e) {
                if ("" == e)
                    return console.error("no bannerId");
                this.rewardedVideoAd = wx.createRewardedVideoAd({
                    adUnitId: e
                }),
                this.rewardedVideoAd.onLoad(function() {
                    console.log("\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u52a0\u8f7d\u6210\u529f")
                }),
                this.rewardedVideoAd.onError(function(e) {
                    gl.failVideo && gl.failVideo(),
                    gl.failVideo = null,
                    console.error("\u6fc0\u52b1\u89c6\u9891\u5e7f\u544a\u52a0\u8f7d\u5931\u8d25", e)
                })
            },
            showRewardVideoAd: function(e) {
                var t = this
                  , i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
                if (!this.rewardedVideoAd)
                    return console.error("no rewardedVideoAd");
                this.rewardedVideoAd.load().then(function() {
                    gl.audio.setGameOpen(!1),
                    t.rewardedVideoAd.show()
                }),
                this.rewardedVideoAd.onClose(function(n) {
                    gl.failVideo && (gl.failVideo = null),
                    n && n.isEnded || void 0 === n ? (console.log("\u89c6\u9891\u56de\u8c03", e),
                    e()) : gl.userinfo.wechatflag && (gl.showTip("\u63d0\u524d\u5173\u95ed\u89c6\u9891\u4e0d\u80fd\u5f97\u5230\u5956\u52b1\u54e6\uff01"),
                    setTimeout(function() {
                        i && i()
                    }, 2e3)),
                    gl.audio.setGameOpen(!0),
                    t.rewardedVideoAd.offClose()
                })
            },
            downloadFile: function(e) {
                return new Promise(function(t, i) {
                    wx.downloadFile({
                        url: e,
                        success: function(e) {
                            console.log("\u4e0b\u8f7d\u6587\u4ef6\u6210\u529f", e),
                            t(e.tempFilePath)
                        },
                        fail: function() {
                            console.log("\u4e0b\u8f7d\u6587\u4ef6\u5931\u8d25"),
                            i()
                        },
                        complete: function() {
                            console.log("\u4e0b\u8f7d\u6587\u4ef6\u5b8c\u6210")
                        }
                    }).onProgressUpdate(function(e) {
                        console.log("\u4e0b\u8f7d\u8fdb\u5ea6", e.progress),
                        console.log("\u5df2\u7ecf\u4e0b\u8f7d\u7684\u6570\u636e\u957f\u5ea6", e.totalBytesWritten),
                        console.log("\u9884\u671f\u9700\u8981\u4e0b\u8f7d\u7684\u6570\u636e\u603b\u957f\u5ea6", e.totalBytesExpectedToWrite)
                    })
                }
                )
            },
            fileAccess: function(e) {
                var t = this;
                return new Promise(function(i, n) {
                    t.sysFileManager.access({
                        path: e,
                        success: function() {
                            console.log("\u6587\u4ef6/\u76ee\u5f55\u5b58\u5728"),
                            i(!0)
                        },
                        fail: function(e) {
                            console.log("\u6587\u4ef6/\u76ee\u5f55\u4e0d\u5b58\u5728"),
                            i(!1)
                        },
                        complete: function() {
                            console.log("\u6587\u4ef6/\u76ee\u5f55\u662f\u5426\u5b58\u5728\u5224\u65ad\u5b8c\u6bd5")
                        }
                    })
                }
                )
            },
            mkdir: function(e) {
                var t = this;
                return new Promise(function(i, n) {
                    t.sysFileManager.mkdir({
                        dirPath: e,
                        success: function() {
                            console.log("\u6587\u4ef6\u5939\u521b\u5efa\u6210\u529f ...", e)
                        },
                        fail: function(e) {
                            console.log("\u6587\u4ef6\u5939\u521b\u5efa\u5931\u8d25 ...", e),
                            n()
                        },
                        complete: function() {
                            console.log("\u6587\u4ef6\u5939\u521b\u5efa\u5b8c\u6210 ..."),
                            i()
                        }
                    })
                }
                )
            },
            saveFile: function(e, t) {
                this.sysFileManager.saveFile({
                    tempFilePath: e,
                    filePath: t,
                    success: function(e) {
                        console.log("\u4fdd\u5b58\u6587\u4ef6\u6210\u529f ...", e)
                    },
                    fail: function(e) {
                        console.log("\u4fdd\u5b58\u6587\u4ef6\u5931\u8d25", e)
                    },
                    complete: function() {
                        console.log("\u4fdd\u5b58\u6587\u4ef6\u5b8c\u6210")
                    }
                })
            },
            copyFile: function(e, t) {
                var i = this;
                return new Promise(function(n, o) {
                    i.sysFileManager.copyFile({
                        srcPath: e,
                        destPath: t,
                        success: function() {
                            console.log("\u6587\u4ef6 copy \u6210\u529f ...", dirPath)
                        },
                        fail: function(e) {
                            console.log("\u6587\u4ef6 copy \u5931\u8d25 ...", e),
                            o()
                        },
                        complete: function() {
                            console.log("\u6587\u4ef6 copy \u5b8c\u6210 ..."),
                            n()
                        }
                    })
                }
                )
            },
            updateGame: function() {},
            showGameClub: function() {
                this.gameclub && this.gameclub.show()
            },
            hideGameClub: function() {
                this.gameclub && this.gameclub.hide()
            },
            onAudioInterruptionEnd: function() {
                wx.onAudioInterruptionEnd(function() {
                    gl.audio.setGameOpen(!0)
                })
            },
            openCustomerServiceConversation: function() {
                wx.openCustomerServiceConversation({
                    sessionFrom: "",
                    showMessageCard: !1,
                    sendMessageTitle: "\u5ba2\u670d",
                    sendMessagePath: "",
                    sendMessageImg: "",
                    success: function() {},
                    fail: function() {},
                    complete: function() {}
                })
            },
            setKeepScreenOn: function() {
                wx.setKeepScreenOn({
                    keepScreenOn: !0,
                    success: function() {
                        console.log("\u5f00\u542f\u5c4f\u5e55\u5e38\u4eae\u6210\u529f")
                    }
                })
            }
        });
        t.exports = new n,
        cc._RF.pop()
    }
    , {}],
    zh: [function(e, t, i) {
        "use strict";
        cc._RF.push(t, "87f1fs0gohHDIfNg4aePXbt", "zh"),
        t.exports = {
            remoteResPath: "https://ttl.088.com/wechatgame/gjmjdzz/",
            shareIconPath: "resources/public/picture/shareIcon.png",
            publicQRCode: "resources/public/picture/QRCode.png",
            globalShareTitle: "\u8fd9\u662f\u5c0f\u6e38\u620f\u53f3\u4e0a\u89d2\u7684\u5206\u4eab",
            loginShareTitle: "\u5c04\u6765\u5c04\u53bb\u5f88\u723d"
        },
        cc._RF.pop()
    }
    , {}]
}, {}, ["LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min", "audio", "bulletCtrl", "chipCtrl", "emitter", "LabelLocalized", "en", "zh", "i18n", "polyglot", "playerCtrl", "role", "userinfo", "wechat", "fluid", "global", "network", "sha1", "bullet", "goods_bottleGas", "goods_buleGlass", "mos", "prefab_await", "prefab_flaunt", "prefab_gudiancePass", "prefab_hintFrame", "prefab_horseRace", "prefab_loading", "prefab_lookClubRank", "prefab_lookRank", "prefab_notice", "prefab_nowRole", "prefab_openBox", "prefab_overMenu", "prefab_pauseMenu", "prefab_selectRole", "prefab_selectScene", "prefab_shareConcern", "prefab_tip", "prefab_treasure", "prefab_tv", "prefab_winPanel", "game", "start"]);
