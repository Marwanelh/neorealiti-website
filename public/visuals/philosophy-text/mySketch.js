let colors = [
  "#0054BB",
  "#0088C7",
  "#009EC2",
  "#00C6B8",
  "#00D19D"
]


let english_content = `
If the one is to remain one, it will not be a whole, and will not have parts?

No.
But if it has no parts, it will have neither beginning, middle, nor end; for these would of course be parts of it.

Right.
But then, again, a beginning and an end are the limits of everything?

Certainly.
Then the one, having neither beginning nor end, is unlimited?
Yes, unlimited.
And therefore formless; for it cannot partake either of round or straight.

But why?
Why, because the round is that of which all the extreme points are equidistant from the centre?

Yes.
And the straight is that of which the centre intercepts the view of the extremes?

True.
Then the one would have parts and would be many, if it partook either of a straight or of a circular form?

Assuredly.
But having no parts, it will be neither straight nor round?
Right.
And, being of such a nature, it cannot be in any place, for it cannot be either in another or in itself.
`

let greek_content = `
οὔτ᾽ ἄρα ὅλον ἔσται οὔτε μέρη ἕξει, εἰ ἓν ἔσται τὸ ἕν.

οὐ γάρ.
οὐκοῦν εἰ μηδὲν ἔχει μέρος, οὔτ᾽ ἂν ἀρχὴν οὔτε τελευτὴν οὔτε μέσον ἔχοι: μέρη γὰρ ἂν ἤδη αὐτοῦ τὰ τοιαῦτα εἴη.

ὀρθῶς.
καὶ μὴν τελευτή γε καὶ ἀρχὴ πέρας ἑκάστου.

πῶς δ᾽ οὔ;
ἄπειρον ἄρα τὸ ἕν, εἰ μήτε ἀρχὴν μήτε τελευτὴν ἔχει.
ἄπειρον.
καὶ ἄνευ σχήματος ἄρα: οὔτε γὰρ στρογγύλου οὔτε εὐθέος μετέχει.

πῶς;
στρογγύλον γέ πού ἐστι τοῦτο οὗ ἂν τὰ ἔσχατα πανταχῇ ἀπὸ τοῦ μέσου ἴσον ἀπέχῃ.

ναί.
καὶ μὴν εὐθύ γε, οὗ ἂν τὸ μέσον ἀμφοῖν τοῖν ἐσχάτοιν ἐπίπροσθεν ᾖ.

οὕτως.
οὐκοῦν μέρη ἂν ἔχοι τὸ ἓν καὶ πολλὰ ἂν εἴη, εἴτε εὐθέος σχήματος εἴτε περιφεροῦς μετέχοι.

πάνυ μὲν οὖν.
οὔτε ἄρα εὐθὺ οὔτε περιφερές ἐστιν, ἐπείπερ οὐδὲ μέρη ἔχει.
ὀρθῶς.
καὶ μὴν τοιοῦτόν γε ὂν οὐδαμοῦ ἂν εἴη: οὔτε γὰρ ἐν ἄλλῳ οὔτε ἐν ἑαυτῷ εἴη.
`

let english_lines = english_content.split("\n")
let english_word_lines = english_lines.map(line => line.split(" "))

let greek_lines = greek_content.split("\n")
let greek_word_lines = greek_lines.map(line => line.split(" "))

let texts = {
    english: english_word_lines,
    greek: greek_word_lines
}

let current_language = 'english';
let word_lines = texts[current_language];

let currentFrame = 0;

let current_line_index = 1;
let current_word_index = -1;

let next_word_frame = 0;
let active_words = [];

let current_word_position = {
  x: 1000,
  y: 1000,
}

let prev_word_bounds = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
}

let word_duration = 150;
let word_delay = 20;
let word_fade_duration = 60;
let border_width = 18;

const canvas_width = 405;
const canvas_height = 720;

// For Instagram, we have a 9:16 canvas, but we want to ensure the
// main content is visible in a 4:5 crop.
const safe_area_ratio = 5 / 4; // height / width for 4:5
const safe_area_height = canvas_width * safe_area_ratio;
const safe_area_margin_y = (canvas_height - safe_area_height) / 2;

const safe_area_top = safe_area_margin_y;
const safe_area_bottom = canvas_height - safe_area_margin_y;

let line_base_color = colors[0];

// Function for first canvas
function sketch1(p) {
  p.setup = function () {
    p.createCanvas(canvas_width, canvas_height);
    p.background(0);
    p.textSize(32);
    p.textAlign(p.LEFT, p.TOP);
    p.textFont('Helvetica');
    p.describe(`Words fading in one at a time on a black background, in shades of blue, teal, and turquoise
      As they fade, they blur and form a cloudy pattern that eventually obscures the whole background.
      By clicking the mouse, the text will switch between English and the original Greek.
      
      The text, as follows, if from Plato's Parmenides: ${english_content}.`)
  };

  p.mousePressed = function() {
    if (current_language === 'english') {
        current_language = 'greek';
    } else {
        current_language = 'english';
    }
    word_lines = texts[current_language];

    current_word_index = -1;
    next_word_frame = currentFrame;

    // p.background(0);
  }

  p.draw = function () {
    // p.background(0);

    if (currentFrame >= next_word_frame) {
      current_word_index++;

      if (current_word_index >= word_lines[current_line_index].length) {
        current_line_index++;
        if (current_line_index >= word_lines.length) {
          next_word_frame = Infinity;
        } else {
          current_word_index = 0;
        }
      }

      if (isFinite(next_word_frame)) {
        current_word_position.x += 24 + prev_word_bounds.w;
        
        let current_word = word_lines[current_line_index][current_word_index];

        let bounds = p.fontBounds(current_word, current_word_position.x, current_word_position.y);

        if (current_word_position.x + bounds.w + border_width > p.width) {
          current_word_position.x = border_width;
          current_word_position.y += 24 + prev_word_bounds.h;
        }

        if (current_word_position.y + bounds.h + border_width > safe_area_bottom) {
          current_word_position.y = safe_area_top + border_width;
          current_word_position.x = border_width;
        }

        prev_word_bounds = bounds;

        let new_color_index = Math.floor(p.random(0, colors.length));
        let new_word = {
            text: current_word,
            x: current_word_position.x,
            y: current_word_position.y,
            start_frame: currentFrame,
            color: colors[new_color_index]
        };
        active_words.push(new_word);

        next_word_frame = currentFrame + word_delay;
      }
    }

    active_words = active_words.filter(word => 
      currentFrame < word.start_frame + word_duration
    );

    for (const word of active_words) {
      let word_age = currentFrame - word.start_frame;
      let fadeColor;

      if (word_age < word_fade_duration) {
        // Phase 1: Glow is base color at full alpha
        fadeColor = word.color + "ff";
      } else {
        // Phase 2: Glow alpha fades out
        let decay_duration = word_duration - word_fade_duration;
        let decay_age = word_age - word_fade_duration;
        let decay_factor = decay_age / decay_duration;
        
        let word_alpha = 255 * (1 - decay_factor);
        let alpha_hex = Math.round(word_alpha).toString(16).padStart(2, '0');
        fadeColor = word.color + alpha_hex;
      }

      p.fill(fadeColor);
      p.noStroke();
      p.text(word.text + " ", word.x, word.y);
    }

    p.filter(p.BLUR, 5);

    for (const word of active_words) {
      let word_age = currentFrame - word.start_frame;
      let use_color;

      if (word_age < word_fade_duration) {
        // Phase 1: Text lightness fades in from white
        let intensity = word_age / word_fade_duration;
        let base_color = p.color(word.color);
        let base_hue = p.hue(base_color);
        let base_saturation = p.saturation(base_color);
        let base_lightness = p.lightness(base_color);
        
        let new_lightness = p.lerp(100, base_lightness, intensity);

        let h = base_hue / 360;
        let s = base_saturation / 100;
        let l = new_lightness / 100;

        let newColor = hslToRgb(h, s, l);
        use_color = p.color(newColor[0], newColor[1], newColor[2]);
      } else {
        // Phase 2: Text alpha fades out
        let decay_duration = word_duration - word_fade_duration;
        let decay_age = word_age - word_fade_duration;
        let decay_factor = decay_age / decay_duration;

        let word_alpha = 255 * (1 - decay_factor);
        let alpha_hex = Math.round(word_alpha).toString(16).padStart(2, '0');
        use_color = word.color + alpha_hex;
      }
      p.fill(use_color);
      p.noStroke();
      p.text(word.text + " ", word.x, word.y);
    }

    p.filter(p.BLUR, 1);

    currentFrame++;
  };
}

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r * 255, g * 255, b * 255 ];
}

new p5(sketch1, 'sketch1');
