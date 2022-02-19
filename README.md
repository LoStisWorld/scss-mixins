# SCSS MIXIN LIST

This is a list of some small SCSS mixins that can make things easier.

Check out the Demofile if you want.

- [SCSS MIXIN LIST](#scss-mixin-list)
  - [Pseudo mixin](#pseudo-mixin)
  - [Triangle mixin](#triangle-mixin)
  - [Text blend mixin](#text-blend-mixin)
  - [Text stroke mixin](#text-stroke-mixin)
  - [Text gradient mixin](#text-gradient-mixin)
  - [Item counter mixin](#item-counter-mixin)
  - [Link hover mixin](#link-hover-mixin)
  - [Container hover mixin](#container-hover-mixin)
  - [Media Query mixin](#media-query-mixin)
<br/>

**How to use the Visual Studio Code Snippets**
If you want to use the Visual Studio Code Snippets, open your Visual Studio Code Editor and press F1 and search for `Preference: Configure User Snippets` then search for `scss.json`.

Open it and paste in the JSON Snippets below the mixins + save the file.

**Use Snippets in Editor**
Type in a SCSS file `lw`, then use the snippet you want.


<br/>

## Pseudo mixin

> The mixin

```scss
@mixin pseudo($pseudo: before, $pos: absolute, $content: "") {
  @if $pseudo == before {
    &::before {
      content: $content;
      position: $pos;
      @content;
    }
  } @else if $pseudo == after {
    &::after {
      content: $content;
      position: $pos;
      @content;
    }
  } @else if $pseudo == both {
    &::before,
    &::after {
      content: $content;
      position: $pos;
      @content;
    }
  }
}
```

> How to use

Default values `::before`, `position: absolute`, `content: ""`

```scss
.element {
  position: relative;

  @include pseudo(both, relative, "★");

  @include pseudo() {
    top: -1rem;
    left: -1rem;
  }

  @include pseudo(after) {
    right: -1rem;
    bottom: -1rem;
  }
}
```

> Same like

```css
.element {
  position: relative;

  &::before,
  &::after {
    content: "★";
    position: relative;
  }

  &::before {
    content: "";
    position: absolute;
    top: -1rem;
    left: -1rem;
  }

  &::after {
    content: "";
    position: absolute;
    right: -1rem;
    bottom: -1rem;
  }
}
```

<br/>

## Triangle mixin

> The mixin

```scss
@mixin triangle($color, $direction, $size) {
  width: 0;
  height: 0;
  border-style: solid;

  @if $direction == top {
    border-width: 0 $size $size $size;
    border-color: transparent transparent $color transparent;
  } @else if $direction == top-right {
    border-width: 0 $size $size 0;
    border-color: transparent $color transparent transparent;
  } @else if $direction == top-left {
    border-width: $size $size 0 0;
    border-color: $color transparent transparent transparent;
  } @else if $direction == right {
    border-width: $size 0 $size $size;
    border-color: transparent transparent transparent $color;
  } @else if $direction == bottom-right {
    border-width: 0 0 $size $size;
    border-color: transparent transparent $color transparent;
  } @else if $direction == bottom {
    border-width: $size $size 0 $size;
    border-color: $color transparent transparent transparent;
  } @else if $direction == bottom-left {
    border-width: $size 0 0 $size;
    border-color: transparent transparent transparent $color;
  } @else if $direction == left {
    border-width: $size $size $size 0;
    border-color: transparent $color transparent transparent;
  } @else {
    @error "Variable in #{$color}, #{$direction}, #{$size} needs to set currectly";
  }
  @content;
}
```

> How to use

Default values `width: 0`, `height: 0`, `border-style: solid`

Directions `top`, `top-right`, `top-left`, `bottom`, `bottom-right`, `bottom-left`, `left`, `right`

```scss
.element {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    @include triangle(aliceblue, top-left, 20px);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    @include triangle(red, bottom-right, 10px);
  }
}
```

> Same like

```scss
.element {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 20px 0 0;
    border-color: aliceblue transparent transparent transparent;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 0 10px;
    border-color: transparent transparent transparent red;
  }
}
```
**Visual Studio Code Triangle JSON Snippet**
```json
{
  "Triangle Mixin": {
    "prefix": "lw-triangle",
    "body": [
      "@include triangle(${1:color}, ${2|up,right,down,left,top-right,bottom-right,bottom-left,top-left|}, ${3|6px,10px,12px,20px,24px,32px,48px,64px|});"
    ],
    "description": "Triangle Mixin"
  },
}
```

<br/>

## Text blend mixin

> The mixin

```scss
// TEXT BLEND MODE MIXIN //
@mixin textBlend($background-color) {
  @if $background-color == black {
    color: white;
    background-color: black;
    mix-blend-mode: multiply;
    @content;
  } @else if $background-color == white {
    color: black;
    background-color: white;
    mix-blend-mode: screen;
    @content;
  } @else {
    @error "Property #{$background-color} must be either black or white.";
  }
}
```

> How to use

Needed value `background-color`

Allowed `black`, `white`

```scss
.element {
  > * {
    text-align: center;
    text-transform: uppercase;
    font-size: 4rem;
    line-height: 1;
    padding: 5rem 0;
  }

  .whiteText {
    @include textBlend(black) {
      font-weight: bold;
    }
  }

  .blackText {
    @include textBlend(white) {
      font-weight: bolder;
    }
  }
}
```

> Same like

```scss
.element {
  > * {
    text-align: center;
    text-transform: uppercase;
    font-size: 4rem;
    line-height: 1;
    padding: 5rem 0;
  }

  .whiteText {
    color: white;
    background-color: black;
    mix-blend-mode: screen;
    font-weight: bold;
  }

  .blackText {
    color: black;
    background-color: white;
    mix-blend-mode: screen;
    font-weight: bolder;
  }
}
```

**Visual Studio Code Text Blend JSON Snippet**
```json
{
  "Text Blend": {
    "prefix": "lw-textBlend",
    "body": [
      "@include textBlend(${1|black,white|});"
    ],
    "description": "Text Blend Mixin"
  },
}
```

<br/>

## Text stroke mixin

> The mixin

```scss
@mixin textStroke($width, $color: null) {
  -webkit-text-fill-color: transparent;
  @if $color {
    -webkit-text-stroke: $width $color;
  } @else {
    -webkit-text-stroke: $width currentColor;
  }

  @content;
}
```

> How to use

Needed value `width`

Allowed `width`, `color`

```scss
.element {
  p {
    color: red;
    font-size: 300%;
    font-weight: bold;

    &:first-child {
      @include textStroke(1px);
    }

    &:nth-child(2) {
      @include textStroke(5px, rgb(0, 0, 0)) {
        font-size: 500%;
      }
    }

    &:last-child {
      @include textStroke(3px, lightcoral) {
        letter-spacing: 2px;
      }
    }
  }
}
```

> Same like

```scss {
.element {
  p {
    color: red;
    font-size: 300%;
    font-weight: bold;

    &:first-child {
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 1px currentColor;
    }

    &:nth-child(2) {
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 5px rgb(0, 0, 0);
      font-size: 500%;
    }

    &:last-child {
      -webkit-text-fill-color: transparent;
      -webkit-text-stroke: 3px lightcoral;
      letter-spacing: 2px;
    }
  }
}
```

**Visual Studio Code Text Stroke JSON Snippet**
```json
{
  "Text Stroke": {
    "prefix": "lw-textStroke",
    "body": [
      "@include textStroke(${1:$width}, ${2:$color(optional)});"
    ],
    "description": "Text Stroke Mixin"
  },
}
```

<br/>

## Text gradient mixin

> The mixin

```scss
@mixin textGradient($direction, $colors...) {
	display: inline-block;
	background: linear-gradient($direction, $colors);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
```

> How to use

Needed values `direction`, `color`

```scss
.element {
  display: inline-flex;
  flex-direction: column;

  h3 {
    font-size: 200%;
    text-transform: uppercase;

    &:first-child {
      @include textGradient(to right, #4158d0, #c850c0, #ffcc70);
    }

    &:nth-child(2) {
      @include textGradient(25deg, #12c2e9, #c471ed, #fc00ff);
    }

    &:last-child {
      @include textGradient(to bottom right, #0099f7 50%, #db36a4 50%);
    }
  }
}
```

> Same like

```scss {
.element {
  display: inline-flex;
  flex-direction: column;

  h3 {
    font-size: 200%;
    text-transform: uppercase;

    &:first-child {
      display: inline-block;
      background: linear-gradient(to right, #4158d0, #c850c0, #ffcc70);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &:nth-child(2) {
      display: inline-block;
      background: linear-gradient(25deg, #12c2e9, #c471ed, #fc00ff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    &:last-child {
      display: inline-block;
      background: linear-gradient(to bottom right, #0099f7 50%, #db36a4 50%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}
```

**Visual Studio Code Text Gradient JSON Snippet**
```json
{
  "Text Gradient": {
    "prefix": "lw-textGradient",
    "body": [
      "@include textGradient(${1|to right,to top,to bottom,to bottom left,to bottom right,to top left, to top right|}, ${2:$colors});"
    ],
    "description": "Text Gradient Mixin"
  },
}
```

<br/>

## Item counter mixin

> The mixin

```scss
@mixin itemCount($content: null, $pseudo: before) {
  counter-increment: itemCount;
  $pos: #{$pseudo};

  @if $pos == before or $pos == after {
    &::#{$pos} {
      @if $content {
        content: $content counter(itemCount);
        @content;
      } @else {
        content: counter(itemCount);
        @content;
      }
    }
  } @else {
    @error "Property #{$pseudo} must be either before or after.";
  }
}
```

> How to use

No values needed

Allowed values `$content`, `$pseudo`

```scss
.element {
  > .item {
    @include itemCount;
  }

  > .item {
    @include itemCount("# ") {
      color: #fff;
    }
  }
}
```

> Same like

```scss {
.element {
  > .item {
    &::before {
      content: counter(itemCount);
    }
  }

  > .item {
    &::after {
      content: "# " counter(itemCount);
      color: #fff;
    }
  }
}
```

<br/>

## Link hover mixin

> The mixin

```scss
@mixin linkHover($hoverColor, $color: currentColor) {
  color: $color;

  &:hover,
  &:focus,
  &:focus-within {
    color: $hoverColor;
  }
}
```

> How to use

Needed value `$hoverColor`

Allowed values `$mainColor`

```scss
.element {
  @include linkHover(#000);
}

.element {
  @include linkHover(currentColor, #fff);
}
```

> Same like

```scss {
.element {
  color: currentColor;

  &:hover,
  &:focus,
  &:focus-within {
    color: #000;
  }
}

.element {
  color: #fff;

  &:hover,
  &:focus,
  &:focus-within {
    color: currentColor;
  }
}
```

**Visual Studio Code Link Hover JSON Snippet**
```json
{
  "Link Hover": {
    "prefix": "lw-linkHover",
    "body": [
      "@include linkHover(${1:hover-color}, ${2:main-color(default currentColor)});"
    ],
    "description": "Link on hover"
  },
}
```

<br/>

## Container hover mixin

> The mixin

```scss
@mixin iconOnHover(
  $background: transparent,
  $direction: left,
  $icon: "✚",
  $time: 0.2s
) {
  position: relative;
  overflow: hidden;

  &::before {
    content: $icon;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $background;
    transition: all $time 0.1s ease-in-out;

    @if $direction == left {
      transform: translateX(-100%);
    } @else if $direction == right {
      transform: translateX(100%);
    } @else if $direction == top {
      transform: translateY(-100%);
    } @else if $direction == bottom {
      transform: translateY(100%);
    } @else {
      @error "Property #{$direction} must be set to left,right,top or bottom.";
    }

    @content;
  }

  &:hover::before {
    transform: translate(0, 0);
  }
}
```

> How to use

No values needed

Default values `$background: transparent, $direction: left, $icon: '✚', $time: 0.2s`

Allowed values `$background`, `$direction`, `$icon`, `$time`

```scss
.element {
  @include iconOnHover(rgba(black, 0.75));
}
```

> Same like

```scss {
.element {
  position: relative;
  overflow: hidden;

  &::before {
    content: "✚";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.75);
  }

  &:hover::before {
    transform: translate(0, 0);
  }
}
```

<br/>

## Media Query mixin

> The mixin

```scss
@mixin mediaSize($size, $width: null, $minmax: null) {
    @if $size == mobile {
        @media (max-width: 544px) {
            @content;
        }
    } @else if $size == mobileUP {
        @media (min-width: 545px) {
            @content;
        }
    } @else if $size == tablet {
        @media (min-width: 769px) {
            @content;
        }
    } @else if $size == desktop {
        @media (min-width: 1025px) {
            @content;
        }
    } @else if $size == desktopXL {
        @media (min-width: 1281px) {
            @content;
        }
    } @else if $size == desktopXXL {
        @media (min-width: 1921px) {
            @content;
        }
    } @else if $size == desktop4K {
        @media (min-width: 2561px) {
            @content;
        }
    } @else if $size == custom {
        @if $width and $minmax {
            @if $minmax == min {
                @media (min-width: $width) {
                    @content;
                }
            } @else if $minmax == max {
                @media (max-width: $width) {
                    @content;
                }
            } @else {
                @error "Property #{$minmax} must be either min or max.";
            }
        } @else if $width and not $minmax {
            @media (min-width: $width) {
                @content;
            }
        } @else {
            @error "Property #{$width} or #{$minmax} is wrong.";
        }
    } @else {
        @error "Property #{$size} is wrong.";
    }
}
```

> How to use

Needed values `$size`

Allowed values `$size`, `$width`, `$minmax`

Possible values
```
$size values
- mobile (max-width: 544px)
- mobileUP (min-width: 545px)
- tablet (min-width: 769px)
- desktop (min-width: 1025px)
- desktopXL (min-width: 1281px)
- desktopXXL (min-width: 1921px)
- desktop4K (min-width: 2561px)
- custom (needs $width value)

$minmax values
- min
- max
```
If you use `custom` as `$size` value, you need to set a `$width`.
Default `$minmax` value is `min-width`

```scss
.element {
  @include mediaSize(custom, 544px, max) {
    width: 100%;
  }
  @include mediaSize(mobileUP) {
    width: 95%;
  }
  @include mediaSize(tablet) {
    width: 90%;
  }
  @include mediaSize(desktop) {
    width: 85%;
  }
  @include mediaSize(custom, 1200px) {
    width: 85%;
  }
  @include mediaSize(custom, 1600px) {
    width: 75%;
  }
}
```

> Same like

```scss 
.element {
  @media (max-width: 544px) {
    width: 100%;
  }
  @media (min-width: 545px) {
    width: 95%;
  }
  @media (min-width: 769px) {
    width: 90%;
  }
  @media (min-width: 1025px) {
    width: 85%;
  }
  @media (min-width: 1200px) {
    width: 85%;
  }
  @media (min-width: 1600px) {
    width: 75%;
  }
}
```

**Visual Studio Code Media-Query JSON Snippet**
```json
{
  "Media Querys": {
    "prefix": "lw-mediaSize",
    "body": [
      "@include mediaSize(${1|mobile,mobileUp,tablet,desktop,desktopXL,desktopXXL,desktop4K,custom|}, ${2:$width}, ${3:$minmax}) {",
      "\t$0",
      "}"
    ],
    "description": "Media Querys\n----------\nmobile = max-width: 544px\nmobileUp = min-width: 545px\ntablet = min-width: 769px\ndesktop = min-width: 1025px\ndesktopXL = min-width: 1281px\ndesktopXXL = min-width: 1921px\ndesktop4K = min-width: 2561px\n"
  },
}
```
