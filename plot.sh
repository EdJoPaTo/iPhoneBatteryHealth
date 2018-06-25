#!/bin/sh

gnuplot stats.gnuplot

inkscape -z -e "output.png" "output.svg" -w 1000 >/dev/null 2>/dev/null
inkscape -z -A "output.pdf" "output.svg" -w 1000 2>/dev/null
