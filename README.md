# skrebets-diploma.github.io

*version 0.0.1*

## Link

https://skrebets.github.io/skrebets-diploma.github.io/

## Purpose

The main porpose of this project is to search news with inputted themes and explore their popularity.

## Description

This is a diploma project which represents a three-pages website **NewsAnalizer** with file-system and code's syntax created by BEM metod and builded by webpack.

To see how BEM works visit webste:

https://ru.bem.info/

To see how Webpack works visit website:

https://webpack.js.org/

There are a lot of features used in this project: *flex-box*, *grid*, *forms*, *preloader*, *slider (swiper)*. Description of *flex-box*, *grid* and *forms* you can find in earlier project's readmes.

*preloader__spinner.css*

```css
@keyframes spin {
	100% {
		transform: rotate(360deg);
	}
}

.preloader__spinner {
    display: block;
	width: 74px;
	height: 74px;
	border: 4px solid #444;
	border-bottom-color: #888;
	
	border-radius: 50%;
	
	animation: spin .75s infinite linear;
}
```

*preloader.css*

```css
@import url('./__spinner/preloader__spinner.css');

.preloader {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-left: auto;
    margin-right: auto;
    padding-top: 80px;
    padding-bottom: 80px;
    max-width: 1440px;
    max-height: 282px;
    background: #F5F6F7;
}
```

To see how swiper works visit website:

https://swiperjs.com/

Also this project based on **responsive** layout. It includes advantages of liquid and adaptive layout.

Adaptive layout involves **media queries**. They are useful when you want to modify your site or app depending on a device's general type (such as print vs. screen) or specific characteristics and parameters (such as screen resolution or browser viewport width).

*results__card.css*

```css
.results__card {
    width: 400px;
    border-radius: 16px;
}

.results__card:active {
    box-shadow: 0px 24px 58px -24px rgba(8, 29, 45, 0.1);
}

@media all and (min-width : 1000px) and (max-width: 1439px) {
    .results__card {
        width: 315px;
        border-radius: 8px;
    }
}

@media all and (min-width : 768px) and (max-width: 999px) {
    .results__card {
        width: 224px;
        border-radius: 8px;
    }
}

@media all and (min-width : 320px) and (max-width: 767px) {
    .results__card {
        width: 288px;
        border-radius: 8px;
    }
}
```

## Things to improve

Add JavaScript functionality.

## Technologies

A list of technologies which are used in project:

1. HTML5,
2. CSS3,
3. JavaScript,
4. Webpack.
