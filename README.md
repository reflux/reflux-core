# RefluxJS

A simple library for unidirectional dataflow architecture inspired by ReactJS [Flux](http://facebook.github.io/react/blog/2014/05/06/flux.html).

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]
[![Bower Version][bower-image]][bower-url]
[![Dependencies][dependencies-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Gratipay][gratipay-image]][gratipay-url]

You can read an overview of Flux [here](http://facebook.github.io/react/docs/flux-overview.html), however the gist of it is to introduce a more functional programming style architecture by eschewing MVC like pattern and adopting a single data flow pattern.

## Questions/Help

For questions please use the following communication channels:

1. [StackOverflow with the `refluxjs` tag](http://stackoverflow.com/questions/tagged/refluxjs)
2. [`#reflux` channel](https://reactiflux.slack.com/messages/reflux/) on Reactiflux Slack group. [Sign up here](http://reactiflux.com/) for an account.
3. [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/spoike/refluxjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

Please only use the [issue tracker](https://github.com/spoike/refluxjs/issues) for bugs and feature requests only.

## Content

- [The Reactive Approach](#the-reactive-approach)
- [Examples](#examples)
- [Installation](#installation)
- [Usage](#usage)
     - [Actions](#creating-actions)
     - [Stores](#creating-data-stores)
     - [Component](#react-component-example)
- [Advanced Usage](#advanced-usage)
- [Colophon](#colophon)

*** 

## The Reactive Approach 

Starting in v0.3.0 Reflux will fully implement the Reactive approach. This change has several advantages

- means state is a lot cleaner, due to how events are normalized into streams, and how streams emit updates to subscribers every time the state changes.
- Reflux will normalize events across platforms, which will:
 - Make Reflux more performant and easier to scale
 - introduce api methods to help you manage evented systems (easy to turn events/actions into observables)
- Changes introduced will allow you to develop your views in a more reusable way

Initially, we'll be using RxJS behind the scenes to achieve these results. [What is RxJS?][what-is-RxJS]

### Other Changes

- Removal of React integration at the core of Reflux
- A more approachable api for integration of both framework components, and your choice of view handling
- Fully embraced the FRP style, now supporting the `Array#extras` syntax, as all Reflux objects will either be Observers/Subscribers or related patterns
 - Fully Asynchronous
- Now uses es6 internally

***

[//]: Links
[what-is-RxJS]:  https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/what.md 
