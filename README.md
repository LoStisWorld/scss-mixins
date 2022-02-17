# SCSS MIXIN LIST

This is a list of some small SCSS mixins that can make things easier.

Check out the Demofile if you want.

<br/>

## Pseudo mixin

The mixin

```css
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

How to use

Standard values are
`::before`, `position: absolute`, `content: ""`

```css
.element {
	position: relative;

	@include pseudo(both, relative, "★") {
		margin: 0 1rem;
		padding: 0 1rem;
		color: white;
		background-color: lightcoral;
	}
}
```
