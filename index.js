
/**
 * Module dependencies.
 */

var Comb = require("comb");

/**
 * Proverb constructor.
 *
 * Based on the readings and algorithms found here:
 *  https://ccrma.stanford.edu/~jos/pasp/Artificial_Reverberation.html
 *  http://www.spinsemi.com/knowledge_base/effects.html#Reverberation
 *  http://www.soundonsound.com/sos/Oct01/articles/advancedreverb1.asp
 *  http://www.freestudy.co.uk/control/t7.pdf
 *
 * @param {AudioContext} context
 */

function Proverb (context) {
  var that = this;

  this.input = context.createGainNode();
  this.output = context.createGainNode();

  this.tunings = {
    comb: {
      feedback: 0.82,
      damping: 0.11,
      cutoff: 2000,
      delayTimes: [
        0.0262,
        0.0366,
        0.0338,
        0.0322,
        0.0289,
        0.0307,
        0.0269,
        0.0253
      ]
    }
  };

  this._recycle = context.createGainNode();
  this._delay = context.createDelayNode();
  this._filter = context.createBiquadFilter();
  this._normalize = context.createGainNode();
  this._normalize.gain.value = 0.99;

  this._delay.delayTime.value = 0.04;
  this._filter.frequency.value = 2000;

  this._combs = this.tunings.comb.delayTimes.map(function (time) {
    var feedback = that.tunings.comb.feedback
      , damping = that.tunings.comb.damping
      , cutoff = that.tunings.comb.cutoff;

    return new Comb(context, time, feedback, damping, cutoff);
  });

  this._combs.forEach(function (comb) {
    that.input.connect(comb.input);
    comb.connect(that._normalize);
  });

  this._normalize.connect(this._recycle);
  this._recycle.connect(this.output);
  this._recycle.connect(this._delay);
  this._delay.connect(this._filter);
  this._filter.connect(this.input);
}

Proverb.prototype = Object.create(null, {

  /**
   * AudioNode prototype `connect` method.
   *
   * @param {AudioNode} dest
   */

  connect: {
    value: function (dest) {
      this.output.connect(dest);
    }
  },

  /**
   * AudioNode prototype `disconnect` method.
   */

  disconnect: {
    value: function () {
      this.output.disconnect();
    }
  },

  /**
   * Module parameter metadata.
   */

  meta: {
    value: {
      name: "Proverb",
      params: {}
    }
  }

});

/**
 * Exports.
 */

module.exports = Proverb;

