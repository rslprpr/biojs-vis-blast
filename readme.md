
# Blast Visualization Component

The Blast visualization component uses table view of visualizing and analysing massive BLAST output data by integrating features, filtering and rendering of BLAST hits.

## Installation

<code>
git clone https://github.com/rslprpr/biojs-vis-blast.git <br>
cd biojs-vis-blast <br>
npm install<br>
./w <br>
npm run watch<br>
npm run snipper <br>
</code>

Start using the component :http://localhost:9090/snippets


## Usage

You can find the component at :[Blast Visualization Component](http://blast.biojs.de) <br>
read more detail at : [wiki](https://github.com/rslprpr/biojs-vis-blast/wiki)


## Documentation and Directories

We alreaddy use the Evalue, Identity, Bit-score and Score features to specialize the alignments. To costumize the filtering and sorting you can change the function below:

<code> sortInit: function Sort() </code>
by adding more options. The features should be add to the <code> select </code>node. Code structure <code>select.appendChild(option4)</code>.


####Features

* item Feature filtering the alignmentes
* Sorting alignments
* Filtering the results by their length
* displaying Evalue for each sequence

####lib folder

The base directory contains styles that help start a project. It contains styles that are large containers of a page. This directory could include SASS files like:

Responsive Grid
Page specific layouts

####biojs-vis-blast file

The main project code



## Contributing

fill free to contribute

