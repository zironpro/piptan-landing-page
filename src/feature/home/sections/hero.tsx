"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  ShieldCheck,
  TrendingUp,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface HeroSectionProps {
  onFindProperties?: () => void;
}

/* ---------------------------------------------------------------------------
   LOGO PATHS — defined ONCE (the original repeated every path twice: once in
   the clipPath and once for the stroke). Now they live in <defs> and are
   referenced with <use>. pathLength="1" normalises dash math, so no more
   magic numbers like 900 / 600 / 950.
--------------------------------------------------------------------------- */
const LOGO_PATHS: { id: string; d: string }[] = [
  {
    id: "lp-p1",
    d: "M67 44.6242C67 49.3283 65.7904 53.3995 63.3711 56.8386C60.9519 60.277 57.5395 62.9371 53.1341 64.8176C48.7272 66.7012 43.546 67.6424 37.5903 67.6406C33.6153 67.6406 29.9768 67.2247 26.6748 66.3923C23.3727 65.5592 20.4943 64.3837 18.0394 62.8637L18.798 57.9184C20.1366 58.8242 21.5708 59.5795 23.0746 60.1707C24.6335 60.7805 26.2484 61.2356 27.8961 61.5284C29.6483 61.8411 31.425 61.9953 33.2048 61.9903C36.5274 61.9903 39.4881 61.3033 42.0869 59.9295C44.6775 58.5624 46.814 56.4674 48.2345 53.9018C49.7326 51.2629 50.4817 48.0421 50.4817 44.2387C50.4817 39.8249 49.597 35.9893 47.8274 32.7318C46.1313 29.5545 43.5533 26.9379 40.405 25.1978C37.2291 23.4242 33.4926 22.5378 29.1955 22.5378H24.9148V83.764C24.8893 84.515 25.1183 85.2522 25.5645 85.8559C25.9963 86.416 26.6816 86.7685 27.6205 86.9127L32.3885 87.5642C33.3261 87.7451 33.9943 88.0621 34.3932 88.5141C34.792 88.966 34.9901 89.6082 34.9873 90.4406C34.9988 90.7919 34.9308 91.1412 34.7884 91.4626C34.6459 91.784 34.4328 92.0688 34.165 92.2957C33.6242 92.7675 32.773 93 31.6195 93H3.35917C2.20366 93 1.35245 92.7675 0.811719 92.2957C0.545995 92.0675 0.335116 91.7822 0.194839 91.4608C0.0545628 91.14 -0.0114845 90.7913 0.00163298 90.4406C0.00163298 89.0313 0.777451 88.0908 2.32908 87.6195L5.41316 86.9127C6.17318 86.7274 6.86794 86.337 7.42195 85.7837C7.90821 85.2311 8.16107 84.5106 8.12714 83.7746V26.228C8.1612 25.4925 7.90827 24.7726 7.42195 24.2212C6.86992 23.6648 6.17678 23.2701 5.41727 23.0792L2.3332 22.3749C0.780196 21.9049 0.00437839 20.9637 0.00574909 19.5513C-0.0114453 19.1976 0.0526608 18.8451 0.19312 18.5206C0.33358 18.1955 0.546635 17.9076 0.815836 17.6782C1.35657 17.2269 2.20778 17 3.36328 17H29.6273C37.5348 17 44.269 18.1861 49.83 20.5572C55.3909 22.9282 59.6401 26.2037 62.5775 30.3825C65.5203 34.562 66.992 39.3121 66.992 44.6329",
  },
  {
    id: "lp-i",
    d: "M133.876 83.764C133.841 84.5 134.093 85.2205 134.579 85.7732C135.048 86.2798 135.734 86.6603 136.636 86.9127L139.67 87.6195C141.223 88.0895 141.998 89.0301 141.997 90.4406C142.01 90.7913 141.944 91.14 141.804 91.4608C141.664 91.7822 141.453 92.0675 141.187 92.2957C140.646 92.7675 139.795 93 138.641 93H112.317C111.196 93 110.365 92.7675 109.824 92.2957C109.557 92.0688 109.343 91.784 109.201 91.4626C109.058 91.1412 108.99 90.7919 109.002 90.4406C109.002 89.0313 109.76 88.0908 111.277 87.6195L114.361 86.9127C115.266 86.6615 115.944 86.2817 116.395 85.7732C116.865 85.2125 117.107 84.4951 117.072 83.764V26.228C117.106 25.4969 116.865 24.7801 116.395 24.2187C115.943 23.7146 115.265 23.3347 114.361 23.0792L111.277 22.3749C109.761 21.9049 109.003 20.9637 109.002 19.5513C108.987 19.197 109.053 18.8439 109.196 18.5187C109.338 18.1942 109.553 17.9064 109.824 17.6782C110.365 17.2275 111.196 17.0019 112.317 17H138.641C139.795 17 140.646 17.2269 141.187 17.6782C141.456 17.9076 141.669 18.1955 141.81 18.5206C141.95 18.8451 142.015 19.1982 141.997 19.5513C141.997 20.9637 141.221 21.9049 139.67 22.3749L136.636 23.0792C135.734 23.3323 135.048 23.7121 134.579 24.2187C134.094 24.772 133.842 25.4925 133.876 26.228V83.764Z",
  },
  {
    id: "lp-p2",
    d: "M253 44.6242C253 49.3283 251.79 53.3995 249.371 56.8386C246.952 60.277 243.54 62.9371 239.134 64.8176C234.727 66.7012 229.545 67.6424 223.589 67.6406C219.614 67.6406 215.976 67.2247 212.675 66.3923C209.375 65.5592 206.497 64.3837 204.04 62.8637L204.799 57.9184C206.137 58.8242 207.57 59.5795 209.074 60.1707C210.632 60.7805 212.247 61.2356 213.895 61.5284C215.647 61.8405 217.423 61.9953 219.203 61.9903C222.526 61.9903 225.486 61.3033 228.085 59.9295C230.676 58.5637 232.813 56.4687 234.233 53.9018C235.731 51.2629 236.48 48.0421 236.482 44.2387C236.482 39.8249 235.597 35.9893 233.827 32.7318C232.134 29.5501 229.556 26.9292 226.407 25.1854C223.229 23.4118 219.493 22.5253 215.198 22.5253H210.917V83.764C210.892 84.515 211.121 85.2522 211.567 85.8559C211.999 86.416 212.684 86.7685 213.623 86.9127L218.391 87.5642C219.329 87.7451 219.996 88.0621 220.394 88.5141C220.791 88.966 220.989 89.6082 220.988 90.4406C221.001 90.7913 220.935 91.14 220.794 91.4608C220.654 91.7822 220.443 92.0675 220.178 92.2957C219.635 92.7675 218.786 93 217.632 93H189.358C188.205 93 187.354 92.7675 186.813 92.2957C186.547 92.0675 186.337 91.7822 186.196 91.4608C186.056 91.14 185.99 90.7913 186.003 90.4406C186.003 89.0313 186.778 88.0908 188.328 87.6195L191.412 86.9127C192.172 86.7237 192.865 86.3296 193.417 85.7732C193.903 85.2205 194.156 84.5 194.122 83.764V26.228C194.156 25.4925 193.903 24.7726 193.417 24.2212C192.864 23.6655 192.171 23.2707 191.412 23.0792L188.328 22.3749C186.778 21.9049 186.003 20.9637 186.003 19.5513C185.985 19.1976 186.05 18.8451 186.19 18.5206C186.331 18.1955 186.544 17.9076 186.813 17.6782C187.354 17.2269 188.205 17 189.358 17H215.628C223.535 17 230.268 18.1861 235.828 20.5572C241.387 22.9282 245.637 26.2037 248.575 30.3825C251.515 34.562 252.987 39.3121 252.989 44.6329",
  },
  {
    id: "lp-t",
    d: "M307.78 17.0091H345.216C346.573 17.0091 347.683 16.8363 348.543 16.492C349.402 16.1495 350.172 15.8138 350.848 15.4881C351.536 15.1612 352.288 14.994 353.049 15.0002C354.27 15.0002 355.192 15.2898 355.812 15.8692C356.435 16.4485 356.929 17.4436 357.286 18.8528L360.88 36.2783C361.095 37.3276 361.02 38.1866 360.664 38.8561C360.307 39.5261 359.683 39.9339 358.786 40.0762C358.054 40.2677 357.279 40.2005 356.59 39.8866C355.946 39.5814 355.406 38.9574 354.981 38.0157C353.118 33.8187 351.527 30.6343 350.207 28.4613C348.886 26.2882 347.563 24.8051 346.236 24.0126C344.913 23.2157 343.284 22.8173 341.35 22.8173H334.808V83.7725C334.808 84.6055 335.039 85.2749 335.502 85.7815C336.049 86.3384 336.737 86.7326 337.489 86.9215L340.544 87.6282C342.083 88.0975 342.852 89.038 342.85 90.449C342.85 92.1509 341.743 93.0012 339.528 93H313.466C312.322 93 311.483 92.7669 310.946 92.2951C310.682 92.067 310.473 91.7823 310.334 91.4609C310.195 91.1396 310.129 90.7909 310.141 90.4403C310.141 89.0312 310.91 88.0907 312.448 87.6195L315.502 86.9128C316.255 86.7232 316.942 86.3291 317.489 85.7734C317.969 85.2202 318.218 84.4998 318.184 83.7645V22.8173H311.64C309.74 22.8173 308.121 23.2157 306.786 24.0126C305.45 24.8094 304.119 26.2919 302.791 28.4613C301.468 30.6331 299.877 33.8175 298.017 38.0157C297.591 38.9574 297.052 39.5814 296.408 39.8866C295.719 40.2005 294.944 40.2677 294.212 40.0762C293.35 39.9339 292.735 39.5261 292.359 38.8561C291.982 38.1866 291.902 37.3276 292.118 36.2783L295.712 18.8528C296.069 17.4436 296.56 16.4491 297.186 15.8692C297.812 15.2898 298.733 15.0002 299.949 15.0002C300.709 14.994 301.46 15.1612 302.148 15.4881C302.827 15.8138 303.596 16.1482 304.455 16.492C305.314 16.8351 306.422 17.0073 307.78 17.0091Z",
  },
  {
    id: "lp-a",
    d: "M417.728 90.4331C417.74 90.783 417.674 91.1317 417.534 91.453C417.394 91.7737 417.184 92.059 416.919 92.2871C416.378 92.7588 415.53 92.9919 414.378 92.9919H397.408C396.253 92.9919 395.398 92.7694 394.839 92.3138C394.563 92.0901 394.344 91.8036 394.198 91.4785C394.052 91.1528 393.986 90.7973 394.003 90.4412C393.993 89.9284 394.165 89.4287 394.489 89.0322C394.813 88.6325 395.372 88.2341 396.165 87.837L397.948 87.1321C398.943 86.6623 399.794 85.9301 400.41 85.0146C400.966 84.1463 401.605 82.6086 402.326 80.4016L419.57 27.5362C420.072 25.9457 420.215 24.7977 419.999 24.0916C419.782 23.3856 419.044 22.8156 417.783 22.3812C416.776 22.0536 416.064 21.6665 415.649 21.2134C415.232 20.7453 415.011 20.1331 415.034 19.5054C415.014 19.1511 415.08 18.7975 415.226 18.4743C415.372 18.1517 415.594 17.8689 415.873 17.6508C416.429 17.2163 417.286 17 418.44 17H445.029C446.183 17 447.029 17.2163 447.57 17.6508C448.112 18.0858 448.381 18.7017 448.381 19.5054C448.402 20.1294 448.19 20.7391 447.786 21.2134C447.388 21.6665 446.723 22.0375 445.785 22.3278C444.815 22.6534 444.237 23.086 444.058 23.6299C443.88 24.1737 443.984 25.0414 444.38 26.2341L462.639 81.5409C463.217 83.3843 463.832 84.7324 464.486 85.5852C465.132 86.436 466.072 87.0582 467.295 87.4559C468.377 87.8556 469.098 88.272 469.457 88.7046C469.836 89.2012 470.027 89.8165 469.997 90.4412C470.009 90.7942 469.94 91.1454 469.795 91.4667C469.649 91.7886 469.432 92.0721 469.16 92.2958C468.599 92.7675 467.746 93 466.593 93H442.751C441.598 93 440.743 92.7675 440.185 92.2958C439.703 91.8682 439.406 91.2703 439.355 90.627C439.304 89.9837 439.505 89.346 439.914 88.8488C440.293 88.4367 440.894 88.0986 441.725 87.845L444.803 87.1943C445.739 86.9059 446.188 86.4354 446.151 85.7828C446.114 85.1302 445.861 84.081 445.394 82.6347L426.371 23.5292L428.154 22.5521L409.615 79.524C409.148 81.0418 408.904 82.2631 408.885 83.1891C408.864 83.6099 408.927 84.0313 409.07 84.4273C409.214 84.8232 409.436 85.1861 409.722 85.4944C410.299 86.1097 411.218 86.671 412.48 87.1775L415.397 87.8842C416.034 88.1005 416.622 88.4411 417.127 88.888C417.328 89.0887 417.486 89.3305 417.589 89.5965C417.691 89.8631 417.742 90.1478 417.728 90.4331ZM411.345 62.0485H443.396L443.6 67.8542H410.918L411.345 62.0485Z",
  },
  {
    id: "lp-n",
    d: "M534.758 90.4412C534.772 90.7861 534.706 91.1298 534.564 91.4456C534.423 91.7607 534.211 92.0385 533.944 92.2585C533.395 92.7141 532.544 92.9596 531.393 92.9938H513.42C512.264 92.959 511.403 92.7135 510.842 92.2585C510.569 92.0428 510.35 91.7663 510.204 91.4505C510.058 91.1348 509.989 90.7886 510.002 90.4412C510.002 89.1391 510.816 88.1775 512.444 87.5566L514.942 86.7984C516.607 86.1818 517.738 85.495 518.334 84.738C518.932 83.976 519.231 82.7479 519.231 81.0461V34.1045C519.231 32.9118 519.087 31.9447 518.798 31.2013C518.509 30.4586 517.839 29.4362 516.787 28.1353L512.225 22.4881C511.75 21.9064 511.332 21.2798 510.976 20.6173C510.769 20.204 510.658 19.749 510.653 19.2866C510.637 18.9659 510.697 18.6458 510.829 18.3531C510.961 18.0603 511.162 17.803 511.414 17.6035C511.919 17.2076 512.606 17.0093 513.474 17.0081H525.799C526.883 17.0081 527.79 17.1976 528.511 17.5768C529.232 17.9559 529.976 18.6725 530.737 19.7217L573.034 75.4095L570.413 81.8125V28.9495C570.413 27.2844 570.142 26.0718 569.601 25.3111C569.06 24.5497 567.9 23.8449 566.124 23.1948L563.628 22.4346C562 21.7478 561.185 20.7863 561.184 19.5501C561.167 19.194 561.235 18.8391 561.381 18.514C561.528 18.189 561.749 17.9031 562.027 17.6793C562.585 17.2262 563.428 17 564.549 17H582.521C583.681 17 584.547 17.2262 585.128 17.6793C585.412 17.8987 585.64 18.1834 585.791 18.5091C585.943 18.8347 586.013 19.1915 585.998 19.5501C585.998 20.8174 585.161 21.7752 583.5 22.4346L581 23.1948C579.335 23.7747 578.204 24.444 577.607 25.2035C577.011 25.9637 576.713 27.2117 576.711 28.9495V77.3667C576.695 78.381 576.804 79.3935 577.037 80.3805C577.257 81.2351 577.645 82.0375 578.176 82.7417L581.489 87.1384C582.176 88.0079 582.601 88.6767 582.766 89.1453C582.926 89.599 583.008 90.0757 583.01 90.5568C583.021 90.888 582.958 91.2187 582.827 91.5233C582.696 91.8284 582.498 92.1007 582.249 92.3201C581.744 92.7732 581 93 580.025 93H565.638C563.898 93 563.029 92.294 563.031 90.8818C563.031 90.3138 562.911 89.7519 562.678 89.2335C562.44 88.709 561.798 87.7226 560.749 86.275L520.311 32.8024L525.576 29.1658V81.1058C525.576 82.6994 525.851 83.8753 526.401 84.6355C526.95 85.395 528.087 86.1215 529.811 86.8152L532.312 87.5734C533.94 88.2242 534.754 89.1857 534.754 90.4573",
  },
  {
    id: "lp-r-outer",
    d: "M591.642 11.9998C591.642 9.96575 592.22 7.97722 593.303 6.28578C594.385 4.59496 595.925 3.27677 597.726 2.49784C599.526 1.71952 601.508 1.51543 603.42 1.91239C605.332 2.30872 607.088 3.28864 608.467 4.72667C609.845 6.16471 610.784 7.99721 611.165 9.99198C611.545 11.9868 611.35 14.0552 610.604 15.9345C609.859 17.8138 608.596 19.4197 606.975 20.5507C605.355 21.681 603.449 22.2839 601.5 22.2845C598.887 22.282 596.381 21.1973 594.533 19.2693C592.685 17.3413 591.645 14.7267 591.642 11.9998ZM590 11.9998C590 14.3729 590.674 16.6934 591.938 18.6664C593.201 20.6399 594.998 22.1778 597.099 23.0866C599.2 23.9947 601.513 24.2325 603.744 23.7694C605.974 23.3063 608.023 22.1635 609.632 20.4851C611.24 18.8068 612.335 16.6685 612.779 14.341C613.223 12.0129 612.995 9.60002 612.124 7.40739C611.254 5.21476 609.78 3.34044 607.889 2.02224C605.998 0.703422 603.775 0 601.5 0C598.451 0.00312073 595.528 1.26828 593.372 3.51833C591.216 5.76775 590.003 8.81795 590 11.9998Z",
  },
  {
    id: "lp-r-inner",
    d: "M598.705 7.36659H600.804C601.897 7.36659 602.55 7.3824 602.769 7.41269C603.159 7.46473 603.519 7.65969 603.784 7.96268C604.034 8.28411 604.162 8.69118 604.142 9.10482C604.155 9.47565 604.061 9.84187 603.872 10.1554C603.689 10.434 603.423 10.6415 603.116 10.7449C602.793 10.8608 601.987 10.9188 600.697 10.9168H598.705V7.36659ZM596 5V18.9934H598.705V13.1569H599.248C599.705 13.1365 600.163 13.1892 600.605 13.3144C600.916 13.4375 601.193 13.6371 601.414 13.8973C601.93 14.5494 602.403 15.2364 602.831 15.9543L604.781 19H608L606.373 16.2685C605.924 15.4669 605.411 14.7075 604.839 13.9981C604.416 13.5344 603.93 13.1392 603.397 12.823C604.569 12.6438 605.449 12.2131 606.036 11.5307C606.636 10.8134 606.952 9.88203 606.918 8.92828C606.93 8.14908 606.728 7.38372 606.335 6.72308C605.976 6.10657 605.43 5.63429 604.785 5.38202C604.14 5.13172 603.104 5.00658 601.676 5.00658L596 5Z",
  },
];

/* Full-width white cloud bank: a solid white base + overlapping clouds so
   there are NO sky gaps anywhere across the width. */
const BANK_CLOUDS = [
  { src: "/hero/clouds000.avif", left: "-12%", bottom: "-6%", drift: "cloud-drift-left" },
  { src: "/hero/cloud000.avif", left: "6%", bottom: "4%", drift: "cloud-drift-right" },
  { src: "/hero/cloudd000.avif", left: "22%", bottom: "-8%", drift: "" },
  { src: "/hero/clouds000.avif", left: "38%", bottom: "2%", drift: "cloud-drift-left" },
  { src: "/hero/cloud000.avif", left: "54%", bottom: "-6%", drift: "cloud-drift-right" },
  { src: "/hero/clouds000.avif", left: "70%", bottom: "4%", drift: "" },
  { src: "/hero/cloudd000.avif", left: "84%", bottom: "-8%", drift: "cloud-drift-left" },
];

function CloudBank({ className = "", size = "38vw", step = 1 }: { className?: string; size?: string; step?: number }) {
  return (
    <div className={`pointer-events-none absolute inset-x-0 ${className}`}>
      <div
        className="absolute inset-x-0 bottom-0 h-[65%]"
        style={{
          background:
            "linear-gradient(to top, #fff 0%, #fff 55%, rgba(255,255,255,0) 100%)",
        }}
      />
      {BANK_CLOUDS.filter((_, i) => i % step === 0).map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: c.left, bottom: c.bottom, width: size, minWidth: 240 }}
        >
          <div className={c.drift ? `anim ${c.drift}` : undefined}>
            <Image
              src={c.src}
              alt=""
              width={1000}
              height={600}
              sizes="38vw"
              className="w-full h-auto"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const clamp = (v: number, min = 0, max = 1) => Math.min(Math.max(v, min), 1 * max);

/* Per-frame scroll-driven values. Pure function, no React involved. */
function computeFrame(raw: number, houseStartY = 73) {
  // Phase 1 (0 -> 50% of the track; cover overlaps its last part so there is no dead scroll): house rises, PIPTAN text draws & fills
  const p = clamp(raw / 0.4);
  // Phase 2 (55% -> 100%): cloud curtain rises and covers everything in white
  const c = clamp((raw - 0.3) / 0.65); // fully white slightly before the hero releases
  const cover = c * c * (3 - 2 * c); // smoothstep
  const houseP = Math.min(p * 1.35, 1);
  const fillAlpha = clamp((p - 0.04) / 0.2);
  return {
    p1: p,
    cover,
    houseY: houseStartY - houseP * (houseStartY - 8), // start% -> 8%
    houseScale: 1 + houseP * 0.44, // 1 -> 1.44
    houseOpacity: Math.max(0, 1 - fillAlpha),
    textY: p * 50,
    textOpacity: Math.max(0, 1 - p * 3.5),
    logoOpacity: clamp(p / 0.05),
    strokeP: clamp((p - 0.01) / 0.22),
    fillAlpha,
    scrollHint: Math.max(0, 1 - p * 3),
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function HeroStage(_props: HeroSectionProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const strokeGRef = useRef<SVGGElement>(null);
  const fillGRef = useRef<SVGGElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    // Parallax layers are collected ONCE (no per-frame DOM queries).
    const parallax = Array.from(
      stage.querySelectorAll<HTMLElement>("[data-parallax]")
    ).map((el) => ({
      el,
      factor: parseFloat(el.dataset.parallax || "0"),
      x: el.dataset.parallaxX || "0px",
    }));

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let houseStartY = 73;
    let trackTop = 0;
    let totalScroll = 1;
    let target = 0; // where the scroll actually is (0..1)
    let current = -1; // what is rendered (smoothed)
    let raf = 0;
    let lastT = 0;
    let inView = true;

    /* ---- measurements are cached; no getBoundingClientRect per scroll ---- */
    const measure = () => {
      // phones: start the house higher so it is clearly visible before scrolling
      houseStartY = window.innerWidth < 640 ? 36 : 73;
      trackTop = track.getBoundingClientRect().top + window.scrollY;
      totalScroll = Math.max(track.offsetHeight - window.innerHeight, 1);
      readTarget();
      kick();
    };

    const readTarget = () => {
      target = clamp((window.scrollY - trackTop) / totalScroll);
    };

    /* ---- the only place that touches the DOM per frame ---- */
    const render = (p: number) => {
      const f = computeFrame(p, houseStartY);

      if (houseRef.current) {
        const s = houseRef.current.style;
        s.transform = `translate3d(-48.5%, ${f.houseY}%, 0) scale(${f.houseScale})`;
        s.opacity = String(f.houseOpacity);
        s.visibility = f.houseOpacity === 0 ? "hidden" : "visible";
      }

      if (textRef.current) {
        const s = textRef.current.style;
        s.transform = `translate3d(0, ${f.textY}px, 0)`;
        s.opacity = String(f.textOpacity);
        // hidden text must not block clicks on the logo / content below
        s.visibility = f.textOpacity === 0 ? "hidden" : "visible";
      }

      if (logoRef.current) {
        const s = logoRef.current.style;
        s.opacity = String(f.logoOpacity);
        s.transform = `translate3d(0, ${(1 - f.strokeP) * 20}px, 0) scale(${
          0.95 + f.strokeP * 0.05
        })`;
        s.visibility = f.logoOpacity === 0 ? "hidden" : "visible";
      }

      // Stroke props are inherited by every <use> inside the group
      const strokeColor = `rgba(11,12,15,${Math.max(
        0,
        (1 - f.fillAlpha) * 0.95
      )})`;
      if (strokeGRef.current) {
        strokeGRef.current.style.strokeDashoffset = String(1 - f.strokeP);
        strokeGRef.current.style.stroke = strokeColor;
      }
      if (fillGRef.current) fillGRef.current.style.opacity = String(f.fillAlpha);
      if (hintRef.current) hintRef.current.style.opacity = String(f.scrollHint);

      if (curtainRef.current) {
        // 135% = fully below the stage (white body + the clouds that hang above it)
        curtainRef.current.style.transform = `translate3d(0, ${
          (1 - f.cover) * 135
        }%, 0)`;
      }

      for (let i = 0; i < parallax.length; i++) {
        const { el, factor, x } = parallax[i];
        el.style.transform = `translate3d(${x}, ${f.p1 * factor}px, 0)`;
      }
    };

    /* ---- smoothing loop: frame-rate independent, sleeps when settled ---- */
    const tick = (t: number) => {
      const dt = Math.min((t - lastT) / 1000 || 0.016, 0.05);
      lastT = t;

      const diff = target - current;
      if (reduceMotion || Math.abs(diff) < 0.0004) {
        current = target;
        render(current);
        raf = 0; // stop looping until the next scroll
        return;
      }
      // exponential smoothing: same feel at 60 / 120 / 144 Hz
      current += diff * (1 - Math.exp(-dt * 9));
      render(current);
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf && inView) {
        lastT = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      readTarget();
      kick();
    };

    /* ---- pause everything while the hero is off-screen ---- */
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        stage.dataset.paused = inView ? "false" : "true"; // pauses CSS animations
        if (inView) {
          readTarget();
          kick();
        } else if (raf) {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { rootMargin: "100px 0px" }
    );
    io.observe(track);

    const ro = new ResizeObserver(measure);
    ro.observe(track);

    measure();
    current = target;
    render(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      io.disconnect();
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={trackRef} className="relative w-full h-[200svh] bg-white -mb-px">
      <section
        ref={stageRef}
        data-paused="false"
        className="hero-stage sticky top-0 w-full h-[100svh] overflow-hidden select-none flex flex-col items-center justify-between"
        style={{
          background: `
            radial-gradient(ellipse 65% 50% at 15% 38%, rgba(255,182,125,0.7) 0%, rgba(255,210,165,0.35) 35%, transparent 65%),
            radial-gradient(ellipse 70% 55% at 85% 20%, rgba(188,222,250,0.75) 0%, rgba(158,203,242,0.3) 45%, transparent 75%),
            linear-gradient(180deg, #6ba4d7 0%, #8bc0e8 25%, #b6d8f2 50%, #dbe8f6 75%, #ecd7c0 100%)
          `,
        }}
      >
        {/* ===== LAYER 1: SKY (z-0) ===== */}
        {/* Sunrise glow: plain radial-gradient instead of blur-3xl + blend-mode (much cheaper) */}
        <div
          className="pointer-events-none absolute -left-28 top-[15%] w-[650px] h-[500px] opacity-40 sm:opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(255,175,105,0.7) 0%, rgba(255,205,150,0.3) 40%, transparent 70%)",
          }}
        />

        {/* Outer div = scroll parallax, inner div = idle drift (they no longer fight over `transform`) */}
        <div
          data-parallax="-31"
          className="pointer-events-none absolute -left-[12%] -top-[2%] w-[36vw] max-w-[520px] opacity-60 will-change-transform"
        >
          <div className="anim cloud-drift-left">
            <Image
              src="/hero/cloud000.avif"
              alt=""
              width={1000}
              height={600}
              priority
              sizes="36vw"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div
          data-parallax="-36"
          className="pointer-events-none absolute -right-[12%] -top-[4%] w-[38vw] max-w-[560px] opacity-60 will-change-transform"
        >
          <div className="anim cloud-drift-right">
            <Image
              src="/hero/clouds000.avif"
              alt=""
              width={1100}
              height={650}
              priority
              sizes="38vw"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* ===== LAYER 2: HERO TEXT (z-10, under the house) ===== */}
        <div
          ref={textRef}
          className="relative z-10 flex flex-col items-center text-center pt-20 sm:pt-24 md:pt-28 px-4 max-w-5xl mx-auto w-full will-change-transform"
        >
          <div className="relative inline-block w-full">
            <h1
              className="font-sans font-[800] tracking-[-0.03em] text-[#121417] leading-[1.1] max-w-[22ch] sm:max-w-[26ch] mx-auto"
              style={{ fontSize: "clamp(1.75rem, 4.4vw, 3.75rem)", textWrap: "balance" }}
            >
              Where Global Capital Meets Africa&rsquo;s Next Era
            </h1>
          </div>

          <p className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg lg:text-[1.18rem] tracking-tight max-w-2xl mx-auto flex items-center justify-center gap-1.5 flex-wrap">
            <span className="font-semibold text-[#18181b]">
              Institutional Synergies. Sovereign Corridors.
            </span>
          </p>

          <div className="mt-6 sm:mt-7">
            <a
              href="/contact"
              className="group inline-flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#1c1c1f] hover:bg-black text-white text-xs sm:text-sm font-medium tracking-wide shadow-lg shadow-black/15 hover:shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-[transform,box-shadow,background-color] duration-300 border border-white/10 cursor-pointer"
            >
              <span>Book a quick consult</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* ===== LAYER 4: HOUSE (z-20) ===== */}
        <div
          ref={houseRef}
          className="absolute bottom-0 left-1/2 z-20 w-[135vw] sm:w-[110vw] md:w-[100vw] lg:w-[92vw] xl:w-[86vw] max-w-[1400px] sm:min-w-[850px] pointer-events-none will-change-[transform,opacity]"
          style={{
            transform: "translate3d(-48.5%, 73%, 0) scale(1)",
            transformOrigin: "50% 80%",
          }}
        >
          <div className="relative w-full">
            {/* The drop-shadow filter on a huge moving image was a major repaint cost; the shadow is now a cheap gradient under the image */}
            <Image
              src="/hero/house.webp"
              alt="Luxury Penthouse Residence"
              width={1400}
              height={1600}
              priority
              fetchPriority="high"
              sizes="(max-width: 768px) 120vw, 92vw"
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* ===== LAYER 5.5: PIPTAN LOGO (z-30) — solid black letters, no glow, no "Real Estate" ===== */}
        <div
          ref={logoRef}
          className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center pointer-events-none px-4 will-change-[transform,opacity]"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          <div className="relative w-[92%] sm:w-[84%] md:w-[76%] lg:w-[68%] max-w-[880px]">
            <svg
              viewBox="0 0 613 96"
              className="w-full h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="PIPTAN"
              role="img"
            >
              <defs>
                {LOGO_PATHS.map((p) => (
                  <path key={p.id} id={p.id} d={p.d} pathLength={1} />
                ))}
                <clipPath id="piptan-logo-clip">
                  {LOGO_PATHS.map((p) => (
                    <use key={p.id} href={`#${p.id}`} />
                  ))}
                </clipPath>
              </defs>

              {/* Solid black fill, clipped to the letters */}
              <g ref={fillGRef} clipPath="url(#piptan-logo-clip)" style={{ opacity: 0 }}>
                <rect x="-30" y="-10" width="673" height="120" fill="#0b0c0f" />
              </g>

              {/* Outline tracing (dark so it is visible on the sky), fades out as the fill arrives */}
              <g
                ref={strokeGRef}
                fill="none"
                strokeWidth={1.2}
                strokeDasharray="1 1"
                style={{ strokeDashoffset: 1, stroke: "rgba(11,12,15,0.95)" }}
              >
                {LOGO_PATHS.map((p) => (
                  <use key={p.id} href={`#${p.id}`} />
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* ===== LAYER 6: FULL-WIDTH WHITE CLOUD BANK (z-35) ===== */}
        <div className="pointer-events-none absolute inset-x-0 -bottom-8 h-[10vh] z-[35]">
          <div data-parallax="-20" className="absolute inset-0 will-change-transform">
            <CloudBank className="inset-0" size="34vw" step={2} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/5 to-transparent z-40" />

        {/* ===== CLOUD CURTAIN (z-45): rises from the bottom, covers the logo, ends in solid white ===== */}
        <div
          ref={curtainRef}
          className="pointer-events-none absolute inset-x-0 top-0 h-full z-[45] will-change-transform"
          style={{ transform: "translate3d(0, 135%, 0)" }}
        >
          {/* white body (becomes the page background for the next section) */}
          <div className="absolute inset-0 bg-white" />

          {/* full-width cloud edge hanging above the white body */}
          <CloudBank className="bottom-[calc(100%-6vh)] h-[36vh]" />

          {/* soft fade so the cloud edge melts into the white body */}
          <div
            className="absolute inset-x-0 top-0 h-[10vh] -translate-y-[3vh]"
            style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0), #fff)" }}
          />
        </div>

        {/* Scroll hint */}
        <div
          ref={hintRef}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#2b2f38]/60 font-semibold">
            Scroll to explore
          </span>
          <div className="w-4 h-7 rounded-full border border-black/25 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-black/50 animate-bounce" />
          </div>
        </div>

        {/* Idle animations: transform/opacity only (compositor-friendly),
            paused when off-screen, disabled for reduced-motion users */}
        <style jsx>{`
          @keyframes cloudDriftLeft {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(15px, -6px, 0); }
          }
          @keyframes cloudDriftRight {
            0%, 100% { transform: translate3d(0, 0, 0); }
            50% { transform: translate3d(-18px, -5px, 0); }
          }
          @keyframes cloudPulse {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 0.95; transform: scale(1.06); }
          }
          @keyframes mistFloat {
            0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.7; }
            50% { transform: translate3d(10px, -4px, 0); opacity: 0.85; }
          }
          @keyframes terraceMist {
            0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.75; }
            50% { transform: translate3d(8px, -3px, 0); opacity: 0.95; }
          }
          .cloud-drift-left  { animation: cloudDriftLeft 20s ease-in-out infinite; }
          .cloud-drift-right { animation: cloudDriftRight 24s ease-in-out infinite; }
          .cloud-pulse       { animation: cloudPulse 8s ease-in-out infinite; }
          .mist-float        { animation: mistFloat 12s ease-in-out infinite; }
          .terrace-mist      { animation: terraceMist 10s ease-in-out infinite; }

          .hero-stage[data-paused="true"] .anim {
            animation-play-state: paused;
          }
          @media (prefers-reduced-motion: reduce) {
            .anim { animation: none !important; }
          }
        `}</style>
      </section>
    </div>
  );
}

/* ===========================================================================
   ABOUT SECTION (renders right after the hero track, as a normal page section)
=========================================================================== */
interface StatItem {
  value: string;
  label: string;
  sub: string;
}

const STATS: StatItem[] = [
  { value: "$1.8B+", label: "Global Capital Deployed", sub: "Across bilateral luxury developments & sovereign corridors" },
  { value: "14+", label: "Sovereign Corridors", sub: "Direct presence across Europe, the Gulf & Africa" },
  { value: "99.4%", label: "Private Portfolio Retention", sub: "Ultra-high-net-worth clients & family offices" },
  { value: "25+ Yrs", label: "Institutional Heritage", sub: "Pioneering bespoke architectural & advisory standards" },
];

const PILLARS = [
  {
    icon: Building2,
    tag: "Bilateral Co-Investment",
    title: "Sovereign & Industrial Corridors",
    description:
      "Structuring cross-border private equity and syndicated debt vehicles bridging GCC liquidity with pan-African growth corridors.",
  },
  {
    icon: ShieldCheck,
    tag: "Fiduciary Protection",
    title: "English Common Law Governance",
    description:
      "All capital placements are structured through DIFC / ADGM SPVs with full foreign repatriation rights and sovereign guarantees.",
  },
  {
    icon: TrendingUp,
    tag: "High-Alpha Real Assets",
    title: "Critical Infrastructure & Energy",
    description:
      "Targeting 18%\u201332% target IRR across commercial solar micro-grids, green battery mineral beneficiation, and logistics hubs.",
  },
];

const ITINERARY = [
  { city: "Nairobi", dates: "Nov 03\u201305 \u00b7 Kenya", detail: "East African Geothermal, Industrial Parks & Tech Corridors" },
  { city: "Kigali", dates: "Nov 07\u201309 \u00b7 Rwanda", detail: "Kigali Special Economic Zone & Cross-Border Logistics Hubs" },
  { city: "Johannesburg", dates: "Nov 12\u201315 \u00b7 South Africa", detail: "SADC Energy Transition & Institutional Asset Managers Forum" },
  { city: "Lagos", dates: "Nov 18\u201321 \u00b7 Nigeria", detail: "West Africa Energy Infrastructure & Fintech Settlement Rails" },
  { city: "Casablanca", dates: "Nov 24\u201326 \u00b7 Morocco", detail: "Maritime Logistics & Pan-African Sovereign Wealth Summit" },
];

const MANDATE_POINTS = [
  "Long-term dollarized Power Purchase Agreements (PPAs) with sovereign off-takers",
  "Direct concessions in green lithium and battery-grade copper beneficiation",
  "Complete capital repatriation guarantees structured under English Common Law",
];

type AboutTab = "vision" | "heritage" | "governance";

const TAB_LABELS: Record<AboutTab, string> = {
  vision: "Strategic Mandate",
  heritage: "Roadshow Itinerary",
  governance: "Legal Framework",
};

function AboutSection() {
  const [activeTab, setActiveTab] = useState<AboutTab>("vision");

  return (
    <section
      id="about"
      className="relative z-10 w-full -mt-[32vh] pt-8 sm:pt-12 pb-28 sm:pb-36 bg-white text-[#111215] overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 md:px-14">
        {/* Section Top Header (centered on mobile, left on desktop) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 pb-10 md:pb-14 border-b border-black/[0.08] text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0 space-y-4">
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-black/[0.04] border border-black/[0.08] text-[11px] font-mono uppercase tracking-[0.22em] text-[#6b7280]">
              <Sparkles className="w-3 h-3 text-[#bc2327]" />
              <span>Institutional Briefing</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-[#0f1115] leading-[1.12]">
              Architects of bilateral capital,{" "}
              <span className="font-serif italic font-normal text-[#bc2327]">catalysts of industrial growth</span>.
            </h2>
          </div>

          <p className="max-w-md mx-auto md:mx-0 text-sm sm:text-base text-[#525866] font-normal leading-relaxed">
            Piptan Investment &amp; Securities operates at the nexus of Gulf institutional capital, sovereign wealth, and high-growth African real asset corridors.
          </p>
        </div>

        {/* Narrative & Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 items-center">
          {/* Left Column: Visual Composition */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl shadow-black/10 border border-black/10 group">
              <Image
                src="/images/boardroom.jpg"
                alt="Piptan Delegation Leadership"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Tabs */}
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex p-1 rounded-xl bg-black/[0.04] border border-black/[0.06] max-w-full overflow-x-auto">
              {(Object.keys(TAB_LABELS) as AboutTab[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab
                      ? "bg-white text-[#0f1115] shadow-sm font-semibold"
                      : "text-[#6b7280] hover:text-[#0f1115]"
                  }`}
                >
                  {TAB_LABELS[tab]}
                </button>
              ))}
            </div>

            {activeTab === "vision" && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h3 className="text-2xl sm:text-3xl font-light text-[#0f1115]">
                  Accelerating capital deployment across <span className="font-serif italic text-[#bc2327]">transformational infrastructure</span>.
                </h3>
                <p className="text-sm sm:text-base text-[#525866] leading-relaxed">
                  Our Africa Delegation 2026 connects Gulf family offices and institutional asset managers directly with sovereign-aligned opportunities in renewable energy, critical mineral refining, and regional digital settlement rails.
                </p>
                <ul className="space-y-3 pt-2">
                  {MANDATE_POINTS.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#1f242e] font-medium">
                      <CheckCircle2 className="w-4 h-4 text-[#bc2327] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "heritage" && (
              <div className="space-y-4 animate-in fade-in duration-300">
                <h3 className="text-2xl sm:text-3xl font-light text-[#0f1115]">
                  Executive Delegation Itinerary &amp; <span className="font-serif italic text-[#bc2327]">Investor Briefings</span>.
                </h3>
                <div className="space-y-4 pt-2">
                  {ITINERARY.map((item) => (
                    <div key={item.city} className="flex items-start gap-4 pb-3 border-b border-black/[0.06] last:border-0">
                      <span className="text-xs font-mono font-bold text-[#bc2327] pt-0.5 w-24 shrink-0">
                        {item.city}
                      </span>
                      <div>
                        <h4 className="text-sm font-semibold text-[#0f1115]">{item.dates}</h4>
                        <p className="text-xs text-[#6b7280] mt-0.5">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "governance" && (
              <div className="space-y-5 animate-in fade-in duration-300">
                <h3 className="text-2xl sm:text-3xl font-light text-[#0f1115]">
                  Institutional security under <span className="font-serif italic text-[#bc2327]">English Common Law</span>.
                </h3>
                <p className="text-sm sm:text-base text-[#525866] leading-relaxed">
                  We guarantee international-grade fiduciary governance. Co-investments are domiciled in premier financial jurisdictions with ironclad dispute arbitration and multilateral investment risk mitigation.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm">
                    <span className="text-xs font-mono text-[#bc2327] uppercase tracking-wider block font-semibold">Jurisdiction</span>
                    <p className="text-sm font-medium text-[#0f1115] mt-1">DIFC &middot; ADGM &middot; LCIA</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-black/10 shadow-sm">
                    <span className="text-xs font-mono text-[#bc2327] uppercase tracking-wider block font-semibold">Guarantees</span>
                    <p className="text-sm font-medium text-[#0f1115] mt-1">Dollarized Sovereign Off-Takes</p>
                  </div>
                </div>
              </div>
            )}

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="/contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#111215] hover:bg-[#bc2327] text-white text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-md hover:shadow-xl hover:scale-[1.02]"
              >
                <span>Request Delegation Briefing</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <span className="text-xs font-mono text-[#6b7280]">
                Private bilateral sessions
              </span>
            </div>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24">
          {PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="relative p-8 rounded-3xl bg-white border border-black/[0.07] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-black/[0.04] text-[#bc2327] flex items-center justify-center mb-6 group-hover:bg-[#bc2327] group-hover:text-white transition-colors duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#6b7280] block mb-2 font-medium">
                  {pillar.tag}
                </span>
                <h4 className="text-xl font-light text-[#0f1115] mb-3 group-hover:text-[#bc2327] transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-sm text-[#525866] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Statistics Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#111215] text-white relative overflow-hidden shadow-2xl border border-white/10">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#bc2327]/25 via-transparent to-transparent"
            aria-hidden="true"
          />
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
            {STATS.map((stat, i) => (
              <div key={i} className={i > 0 ? "pt-6 lg:pt-0 lg:pl-8" : ""}>
                <span className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white block mb-1 font-serif">
                  {stat.value}
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#c5a867] block font-semibold mb-1">
                  {stat.label}
                </span>
                <p className="text-xs text-white/60 leading-normal">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================================================
   DEFAULT EXPORT: hero (scroll-pinned) + about (normal page flow)
=========================================================================== */
export default function HeroSection({ onFindProperties }: HeroSectionProps) {
  return (
    <>
      <HeroStage onFindProperties={onFindProperties} />
      <AboutSection />
    </>
  );
}