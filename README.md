# SCSS MIXIN LIST

This is a list of some small SCSS mixins that can make things easier.

Check out the Demofile if you want.

- [SCSS MIXIN LIST](#scss-mixin-list)
	- [Pseudo mixin](#pseudo-mixin)
	- [Triangle mixin](#triangle-mixin)
	- [Text blend mixin](#text-blend-mixin)
	- [Text stroke mixin](#text-stroke-mixin)

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
