import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once; import gsap from here everywhere else.
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
