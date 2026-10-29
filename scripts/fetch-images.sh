#!/usr/bin/env bash
# Copies photos from the live WordPress site into public/.
# Run it BEFORE the WordPress site is replaced:   bash scripts/fetch-images.sh
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../public" && pwd)"
B=https://wilsonandco.es/wp-content/uploads
get() {
  local dest="$ROOT/$1"
  mkdir -p "$(dirname "$dest")"
  curl -fsSL "$B/$2" -o "$dest" && echo "ok  $1" || echo "FAIL $1 ($2)"
}

get images/hero-wandsworth.jpg            2020/12/Hero_Wandsworth_WilsonAndCo-scaled.jpg
get images/classical-beauty.jpg           2020/12/Hero_Wandsworth_WilsonAndCo-scaled.jpg
get images/industrial-clapham.jpg         2022/11/WilsonAndCO_Clapham_Main-1-scaled.jpg
get images/clapham-south.jpg              2022/11/WilsonAndCO_ClaphamSouth_Main-1-scaled.jpg
get images/entertainment-heaven.jpg       2022/12/WilsonAndCo_EntertainingHeaven_Main-1-scaled.jpg
get images/coastal-solar.jpg              2022/12/WilsonAndCo_Solar_Cast-1-scaled.jpg
get images/eixample-bathroom.jpg          2026/04/bathroom_wco_9_featured.jpg
get images/japandi-clot.jpg               2026/04/clot_wilsonandco_featured.jpg
get images/warm-minimalism.jpg            2026/04/romo_wilsonco_featured.jpg
get images/rohan-wilson.jpg               2022/11/RohanWilson_Profile.jpg
get images/monica-howe.jpg                2022/11/MonicaHowe_Profile.jpg
get images/Video_WilsonAndCo_Poster.png   2025/01/Video_WilsonAndCo_Poster.png
get videos/WilsonandCo_Video_1080_HR.mp4  2025/04/WilsonandCo_Video_1080_HR.mp4

# Galleries, in the same order the project pages display them.
for n in 1 2 3 4; do
  get "images/gallery/WilsonAndCo_Industrial_Clapham${n}.jpg" "2022/11/WilsonAndCo_Industrial_Clapham${n}.jpg"
done
for n in 5 6; do
  get "images/gallery/WilsonAndCo_Industrial_Clapham${n}-scaled.jpg" "2022/11/WilsonAndCo_Industrial_Clapham${n}-scaled.jpg"
done
for n in 1 2 3 4 5 6 7 8 9; do
  get "images/gallery/WilsonAndCo_Clapham_South${n}.jpg" "2022/11/WilsonAndCo_Clapham_South${n}.jpg"
done
for n in 1 2 3 4 5 6; do
  get "images/gallery/WilsonAndCo_Entertaining_Heaven${n}-scaled.jpg" "2022/12/WilsonAndCo_Entertaining_Heaven${n}-scaled.jpg"
done
for n in 7 8 9 10 11 12; do
  get "images/gallery/WilsonAndCo_Entertaining_Heaven${n}.jpg" "2022/12/WilsonAndCo_Entertaining_Heaven${n}.jpg"
done
for n in 1 2 3 4 5 6 7 8 9; do
  get "images/gallery/WilsonAndCo_ClassicalBeauty${n}.jpg" "2022/12/WilsonAndCo_ClassicalBeauty${n}.jpg"
done
for n in 1 2 3 4 5 6; do
  get "images/gallery/Solar_${n}.jpg" "2022/12/Solar_${n}.jpg"
done
for n in 1 2 3 4 5 6 7 8; do
  get "images/gallery/bathroom_wco_${n}-scaled.jpg" "2026/04/bathroom_wco_${n}-scaled.jpg"
done
for n in 2 3 4 5 7 8 10 13 14 16 17; do
  get "images/gallery/clot_wilsonandco_${n}-scaled.jpg" "2026/04/clot_wilsonandco_${n}-scaled.jpg"
done
for n in 1 2 3 4 5 6 7 8 9 10 11 12 13; do
  get "images/gallery/romo_wilsonco_${n}-scaled.jpg" "2026/04/romo_wilsonco_${n}-scaled.jpg"
done
