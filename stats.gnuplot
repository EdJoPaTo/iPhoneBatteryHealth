#!/usr/bin/env gnuplot

file = "stats.csv"
numberOfColumns = system("head -1 " . file . " | sed 's/[^,]//g' | wc -c")

set datafile separator ","
set xdata time
set timefmt "%Y-%m"

set term svg size 1000,800 dynamic
set output "output.svg"

set key bottom autotitle columnhead
set style data linespoints
set title "iPhone Battery Health"
set ylabel "Battery Health"
set ytics format "%0.0f %%"

set format x "%y-%m"
set grid
set xtics "2018-01",2592000,"2020-12"

plot for [i=2:numberOfColumns] file using 1:i

set term pdfcairo size 20cm,15cm
set output "output.pdf"
replot

set term pngcairo size 1000,800
set output "output.png"
replot
