#!/usr/bin/env gnuplot

file = "tmp/device-age.csv"
numberOfColumns = system("head -1 " . file . " | sed 's/[^,]//g' | wc -c")

set datafile separator ","

set term svg size 1000,800 dynamic
set output "dist/device-age.svg"

set key top autotitle columnhead
set style data linespoints
set title "iPhone Battery Health"
set ylabel "Battery Health"
set ytics format "%0.0f %%"
set xlabel "Age of Battery in Months"

set style line 100 lc rgb "black" lw 1 dashtype 3
set style line 101 lc rgb "dark-gray" lw 1 dashtype 3
set grid xtics mxtics ytics linestyle 100, linestyle 101
set xtics 12
set mxtics 4

plot for [i=2:numberOfColumns] file using 1:i

set term pdfcairo size 20cm,15cm
set output "dist/device-age.pdf"
replot

set term pngcairo size 1000,800
set output "dist/device-age.png"
replot
