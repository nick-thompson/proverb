
# proverb

  An experimental reverb implementation for the Web Audio API.

## Installation

    $ component install web-audio-components/proverb

## Forewarning

Proverb is a highly experimental reverb implementation built on the Web Audio
API, that is, and for a long time will be, under development. Realistically it's 
more of an interesting challenge than a useful module.
Use it with care, as positive feedback loops are very possible and will quickly
bite your ears. If you have experience building reverbs, I'm happy to include
your contributions!

## Background

 * [https://ccrma.stanford.edu/~jos/pasp/Artificial_Reverberation.html](https://ccrma.stanford.edu/~jos/pasp/Artificial_Reverberation.html
)
 * [http://www.spinsemi.com/knowledge_base/effects.html#Reverberation](http://www.spinsemi.com/knowledge_base/effects.html#Reverberation
)
 * [http://www.soundonsound.com/sos/Oct01/articles/advancedreverb1.asp](http://www.soundonsound.com/sos/Oct01/articles/advancedreverb1.asp)
 * [http://www.freestudy.co.uk/control/t7.pdf](http://www.freestudy.co.uk/control/t7.pdf)

## Example Usage

```javascript
var context = new webkitAudioContext()
  , node = context.createOscillator()
  , Proverb = require("proverb")
  , proverb = new Proverb(context);

node.connect(proverb.input);
proverb.connect(context.destination);
node.start(0);
```

## API

### Proverb(context)

Instantiate an Overdrive effect module. Expects an `AudioContext` as the first
parameter.

### .connect(node)

Connect an Overdrive module to an `AudioNode`.

### .disconnect()

Disconnect all outgoing connections from an Overdrive module.

## License

  Copyright (c) 2012 Nick Thompson

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.

