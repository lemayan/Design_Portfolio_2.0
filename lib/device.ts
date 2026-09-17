export type ContactDevice='iphone'|'galaxy';
// Match the OS family, not an unreleased product's hardware specifications.
export function contactDevice(userAgent:string):ContactDevice{return /Macintosh|Mac OS|iPhone|iPad|iPod/i.test(userAgent)?'iphone':'galaxy';}
