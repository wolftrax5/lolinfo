var React = require('react-native');

global.Config = require('./StaticData/Config.js');
var REQUEST_RUNE = 'https://global.api.pvp.net/api/lol/static-data/lan/v1.2/rune/';
var REQUEST_RUNE_COMPLEMENT = '?locale=es_ES&version='+ global.Config.api.vercion +'&runeData=image&api_key='+ global.Config.api.key;

var REQUEST_IMAGE_RUNE = 'http://ddragon.leagueoflegends.com/cdn/'+global.Config.api.vercion+'/img/rune/';
var {
  View,
  Text,
  Image,
  StyleSheet,
} = React;

var RuneMatch = React.createClass({
   getInitialState: function() {
    return {
     loaded: false,
     runeUsed:null,
    };
  },
  //PARA OBTENER LOS DATOS DE IMGAEN RUNA
  fetchDataRune: function() {
    var urlRequest = REQUEST_RUNE +this.props.rune.runeId + REQUEST_RUNE_COMPLEMENT;
    fetch(urlRequest)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
       runeUsed: responseData,
       loaded: true
      });
    })
    .done();
  }, 

  renderLoadingView: function() {
    this.fetchDataRune();
    return (
      <View style={styles.container}>
        <Text>
          Loading Runes ...
        </Text>
      </View>
    );
  },
  
  render: function() {
      if(!this.state.loaded){
      return this.renderLoadingView();
    }
    urlImge = REQUEST_IMAGE_RUNE + this.state.runeUsed.image.full;
    return (
        
          <View style={[styles.container, styles.ligthBlue]}>
            <Image
              style={[styles.image , styles.layoutImage]}
              source={{uri: urlImge}}/>
            <Text style={[ styles.simpleText]}> X {this.props.rune.rank}</Text>
            <View style={[styles.rightContainer]}>
              <Text style={[ styles.simpleText]}>{this.state.runeUsed.name}</Text>
              <Text style={[ styles.simpleText]}>
                {this.state.runeUsed.description}
              </Text>
            </View>
          </View>

    );
  },
});

var styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-start',
    overflow:'hidden',
    textAlign: 'left',
    marginLeft: 5,
  },
  ligthBlue:{
    backgroundColor: '#2c2c64',
  },
  simpleText:{
    color:'#E6E6E6'
  },
  image: {
    width: 65,
    height: 65,
  },
  layoutImage:{
    marginLeft: 5,
    backgroundColor: 'transparent'
  },
});

module.exports = RuneMatch;
