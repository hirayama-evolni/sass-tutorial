# インストール

1. Rubyを入れる
2. gem install sass

か、[Prepros](http://alphapixels.com/prepros/)をインストールしましょう。

# 最初のSass Stylesheet

まずシンプルなSCSSファイルを作りましょう。
SCSSはCSS3の拡張なので、最初は普通のCSSです。

SCSS:
```scss
#navbar {
  width: 80%;
  height: 23px;
}
```
CSS:
```css
#navbar {
  width: 80%;
  height: 23px; }

```


# ネスト

CSSを書く時に、"#navbar ul"、"#navbar li"、"#navbar li a"のように、セ
レクタの始まりが同じものがよく出てきます。何度もおなじものを繰り返し書
くのはめんどうです。

Sassでは親セレクタの中に子セレクタをネストすることでこれを回避できます。

SCSS:
```scss
#navbar {
  width: 80%;
  height: 23px;

  ul { list-style-type: none; }
  li {
    float: left;
    a { font-weight: bold; }
  }
}

```
CSS:
```css
#navbar {
  width: 80%;
  height: 23px; }
  #navbar ul {
    list-style-type: none; }
  #navbar li {
    float: left; }
    #navbar li a {
      font-weight: bold; }

```


セレクタだけでなくプロパティのネストもできます。

SCSS:
```scss
.fakeshadow {
  border: {
    style: solid;
    left: {
      width: 4px;
      color: #888;
    }
    right: {
      width: 2px;
      color: #ccc;
    }
  }
}
```
CSS:
```css
.fakeshadow {
  border-style: solid;
  border-left-width: 4px;
  border-left-color: #888;
  border-right-width: 2px;
  border-right-color: #ccc; }

```


# 親の参照

親セレクタとの間にスペースがない`:hover`のような場合は`&`を使います。

SCSS:
```scss
a {
  color: #ce4dd6;
  &:hover { color: #ffb3ff; }
  &:visited { color: #c458cb; }
}

```
CSS:
```css
a {
  color: #ce4dd6; }
  a:hover {
    color: #ffb3ff; }
  a:visited {
    color: #c458cb; }

```


# 変数

Sassでは変数が使えます。変数名は`$`で始まります。変数には色や数値(単位
付きも)、文字列など、CSSで有効な値ならなんでも入れられます。

SCSS:
```scss
$main-color: #ce4dd6;
$style: solid;

#navbar {
  border-bottom: {
    color: $main-color;
    style: $style;
  }
}

a {
  color: $main-color;
  &:hover { border-bottom: $style 1px; }
}

```
CSS:
```css
#navbar {
  border-bottom-color: #ce4dd6;
  border-bottom-style: solid; }

a {
  color: #ce4dd6; }
  a:hover {
    border-bottom: solid 1px; }

```


変数は決まった値を繰り返さず再利用できるので、変更量が少なくすみます。

# 演算子と関数

変数はそのまま使うだけでなく演算したり関数に渡したりできます。

`+`、`-`、`*`、`/`、`%`が数値演算(単位付きでも)に使えます。色には
`lightness`、`hue`、`saturation`などの関数が使えます。

SCSS:
```scss
#navbar {
  $navbar-width: 800px;
  $items: 5;
  $navbar-color: #ce4dd6;

  width: $navbar-width;
  border-bottom: 2px solid $navbar-color;

  li {
    float: left;
    width: $navbar-width/$items - 10px;

    background-color:
      lighten($navbar-color, 20%);
    &:hover {
      background-color:
        lighten($navbar-color, 10%);
    }
  }
}
```
CSS:
```css
#navbar {
  width: 800px;
  border-bottom: 2px solid #ce4dd6; }
  #navbar li {
    float: left;
    width: 150px;
    background-color: #e5a0e9; }
    #navbar li:hover {
      background-color: #d976e0; }

```


# 変数展開

変数はプロパティ名やセレクタの中に展開することもできます。

SCSS:
```scss
$vert: top;
$horz: left;
$radius: 10px;

.rounded-#{$vert}-#{$horz} {
  border-#{$vert}-#{$horz}-radius: $radius;
  -moz-border-radius-#{$vert}#{$horz}: $radius;
  -webkit-border-#{$vert}-#{$horz}-radius: $radius;
}
```
CSS:
```css
.rounded-top-left {
  border-top-left-radius: 10px;
  -moz-border-radius-topleft: 10px;
  -webkit-border-top-left-radius: 10px; }

```


# Mixin

MixinはSassの強力な機能で、スタイルの再利用を可能にします。
Mixinは`@mixin`を使用して定義します。`@mixin`に続くブロック内に定義さ
れたスタイルを後で`@include`で取り込むことができます。

SCSS:
```scss
@mixin rounded-top-left {
  $vert: top;
  $horz: left;
  $radius: 10px;

  border-#{$vert}-#{$horz}-radius: $radius;
  -moz-border-radius-#{$vert}#{$horz}: $radius;
  -webkit-border-#{$vert}-#{$horz}-radius: $radius;
}

#navbar li { @include rounded-top-left; }
#footer { @include rounded-top-left; }

```
CSS:
```css
#navbar li {
  border-top-left-radius: 10px;
  -moz-border-radius-topleft: 10px;
  -webkit-border-top-left-radius: 10px; }

#footer {
  border-top-left-radius: 10px;
  -moz-border-radius-topleft: 10px;
  -webkit-border-top-left-radius: 10px; }

```


# Mixinの引数

Mixinには引数を渡すことができます。

SCSS:
```scss
@mixin rounded($vert, $horz, $radius: 10px) {
  border-#{$vert}-#{$horz}-radius: $radius;
  -moz-border-radius-#{$vert}#{$horz}: $radius;
  -webkit-border-#{$vert}-#{$horz}-radius: $radius;
}

#navbar li { @include rounded(top, left); }
#footer { @include rounded(top, left, 5px); }
#sidebar { @include rounded(top, left, 8px); }
```
CSS:
```css
#navbar li {
  border-top-left-radius: 10px;
  -moz-border-radius-topleft: 10px;
  -webkit-border-top-left-radius: 10px; }

#footer {
  border-top-left-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -webkit-border-top-left-radius: 5px; }

#sidebar {
  border-top-left-radius: 8px;
  -moz-border-radius-topleft: 8px;
  -webkit-border-top-left-radius: 8px; }

```


# @import

CSSが大きくなった時はファイルを分割して、`@import`を使用して読み込むこ
とができます。

読み込まれる側のファイルはファイル名の先頭に`_`を付ける規約になってい
ます。

_rounded.scss:
SCSS:
```scss
@mixin rounded($vert, $horz, $radius: 10px) {
  border-#{$vert}-#{$horz}-radius: $radius;
  -moz-border-radius-#{$vert}#{$horz}: $radius;
  -webkit-border-#{$vert}-#{$horz}-radius: $radius;
}

```
SCSS:
```scss
@import "rounded";

#navbar li { @include rounded(top, left); }
#footer { @include rounded(top, left, 5px); }
#sidebar { @include rounded(top, left, 8px); }

```
CSS:
```css
#navbar li {
  border-top-left-radius: 10px;
  -moz-border-radius-topleft: 10px;
  -webkit-border-top-left-radius: 10px; }

#footer {
  border-top-left-radius: 5px;
  -moz-border-radius-topleft: 5px;
  -webkit-border-top-left-radius: 5px; }

#sidebar {
  border-top-left-radius: 8px;
  -moz-border-radius-topleft: 8px;
  -webkit-border-top-left-radius: 8px; }

```



# 続き

詳しいことは
[リファレンス](http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html)
で！
