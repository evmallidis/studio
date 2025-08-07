import {
  gsap,
  Power0,
  Power1,
  Power2,
  Power3,
  Power4,
  Linear,
  Quad,
  Cubic,
  Quart,
  Quint,
  Strong,
  Elastic,
  Back,
  SteppedEase,
  Bounce,
  Sine,
  Expo,
  Circ,
  TweenLite,
  TimelineLite,
  TimelineMax,
} from './gsap-core.js'
import { CSSPlugin } from './CSSPlugin.js'
import { DrawSVGPlugin } from './DrawSVGPlugin.js'
import { MotionPathPlugin } from './MotionPathPlugin.min.js'
import { ScrollTrigger } from './ScrollTrigger.min.js'


const gsapWithCSS = gsap.registerPlugin(CSSPlugin) || gsap // to protect from tree shaking
const TweenMaxWithCSS = gsapWithCSS.core.Tween

export {
  gsapWithCSS as gsap,
  gsapWithCSS as default,
  CSSPlugin,
  DrawSVGPlugin,
  MotionPathPlugin,
  ScrollTrigger,
  TweenMaxWithCSS as TweenMax,
  TweenLite,
  TimelineMax,
  TimelineLite,
  Power0,
  Power1,
  Power2,
  Power3,
  Power4,
  Linear,
  Quad,
  Cubic,
  Quart,
  Quint,
  Strong,
  Elastic,
  Back,
  SteppedEase,
  Bounce,
  Sine,
  Expo,
  Circ,
}
