// import fs from 'fs-react';
import CSVReader from 'react-csv-reader'
// import fs-react from 'fs-react'
// import fs-
// import fs from 'fs';
// import RNFS from 'react-native-fs'

/*
export const parseData = async () => {
  const dir = await fs.promises.opendir('./data')
  for await (const dirent of dir) {
    console.log(dir)
  }
}
*/
mises.opendir('./data')
  5   for await (const direntfile

readTextFile = file => {
		var rawFile = new XMLHttpRequest();
    rawFile.open("GET", './data/data1.csv', false);
		rawFile.onreadystatechange = () => {
			if (rawFile.readyState === 4) {
				if (rawFile.status === 200 || rawFile.status == 0) {
					var allText = rawFile.responseText;
					this.setState({
						text: allText
					});
				}
			}
		};
		rawFile.send(null);
	};
