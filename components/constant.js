import { Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const scale = windowWidth / 320;


const ResposiveSize = (size) => Math.round(size * scale);
const global = {
    primaryColor: '#05348E',
    primaryColorDark:"#002245",
    secondaryColor: "#69BE25",
    black: 'black',
    white: 'white',
    inputWidth: windowWidth * 0.9,
    inputHeight: windowHeight * 0.07,
    inputPaddingH: windowHeight * 0.02,
    placeholderColor: '#666666'
}

export { global, ResposiveSize }