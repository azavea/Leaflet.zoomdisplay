/*
 * L.Control.ZoomDisplay shows the current map zoom level
 */

"use strict";

L.Control.ZoomDisplay = L.Control.extend({
    options: {
        position: 'topleft'
    },

    onAdd: function (map) {
        this._map = map;
        this._container = L.DomUtil.create('div', 'leaflet-control-zoom-display leaflet-bar-part leaflet-bar');
        this.updateMapZoom();
        map.on('zoomend', this.updateMapZoom, this);
        return this._container;
    },

    onRemove: function (map) {
        map.off('zoomend', this.updateMapZoom, this);
    },

    updateMapZoom: function () {
        var zoom = this._map.getZoom();
        if (typeof(zoom) === "undefined") { zoom = "" }
        this._container.innerHTML = zoom;
    }
});

L.Map.mergeOptions({
    zoomDisplayControl: true
});

L.Map.addInitHook(function () {
    if (this.options.zoomDisplayControl) {
        this.zoomDisplayControl = new L.Control.ZoomDisplay();
        this.addControl(this.zoomDisplayControl);
    }
});

L.control.zoomDisplay = function (options) {
    return new L.Control.ZoomDisplay(options);
};
