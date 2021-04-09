import * as d3 from "d3";
import { SatRec, twoline2satrec } from "satellite.js";
import { satrecToFeature } from "./conversion";

export class TwoLineElement {
    _properties;
    _date;
    _lines = (arry) => {
      return arry.slice(0, 2);
    };

    constructor() {}
  
    satrecs = (tles: string[][]): SatRec[] => {
      return tles.map((d) => {
        return twoline2satrec.apply(null, this._lines(d));
      });
    }
  
    features = (tles) => {
      const date = this._date || d3.now();
  
      return tles.map((d) => {
        const satrec = twoline2satrec.apply(null, this._lines(d));
        return satrecToFeature(satrec, date, this._properties(d));
      });
    }
  
    lines = (func) => {
      if (!func) return this._lines;
      this._lines = func;
      return this;
    }
  
    properties = (func) => {
      if (!func) return this._properties;
      this._properties = func;
      return this;
    }
  
    date = (ms) => {
      if (!ms) return this._date;
      this._date = ms;
      return this;
    }

  }