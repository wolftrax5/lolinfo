var React = require('react-native');

var REQUEST_SUMMONER = 'https://lan.api.pvp.net/api/lol/';
var REQUEST_MIDDLE = '/v1.4/summoner/by-name/';
var REQUEST_COMPLEMENT = '?api_key=92a530c4-7909-4ab8-bcf3-5390118fbaea';

var {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableHighlight,
} = React;

var SearchSummoner = React.createClass({



	getInitialState: function() {
    return {
    		loaded: false,
			summoner: null,
			inputValue: '',
			region: 'LAN'
    };
  },
	/*
		Metodos innecesarios ya que aqui no se esta haciendo ninguna consulta
		solo es el muestreo de la interfaz osea que solo ocupamos render


	renderLogSummonerView: function() {
  	return (
  		<View >
   			<LogSummoner/>
  		</View>
    );
  },

	*/
	fetchData: function() {
		var urlRequest = REQUEST_SUMMONER + this.state.region +REQUEST_MIDDLE + this.state.inputValue + REQUEST_COMPLEMENT;
    fetch(urlRequest)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
       summoner: responseData,
        loaded: true,
      });
    })
    .done();

		return console.log(urlRequest);
  },

	search: function(){
		if(this.state.input === ''){
			return console.log('campo vacio');
		}

		this.fetchData();
		return console.log(this.state.summoner);
	},

	updateText: function(text) {
		this.setState({
			inputValue: text,
		});
	},

	renderStaticView: function() {
		return (
			<View style = {styles.container}>
				<View style = {styles.inputsContainer}>
					<TextInput
						style={styles.textInput}
						onChange={
							(event) => this.updateText(
								event.nativeEvent.text
          		)
						}
					/>

					<TouchableHighlight onPress={this.search}>
						<View style={styles.buttonContainer}>
						</View>
					</TouchableHighlight>
				</View>
			</View>
		);
	},

	render: function() {
		if(!this.state.loaded){
			return this.renderStaticView();
		}


		/*
			TODO Aqui se hace la llamada al modulo donde se mostrara
			la informacion del summoner
		*/
    return (
			<View>
				<Text style={styles.centro}>Encontrado</Text>
			</View>
		);
  },
});

var styles = StyleSheet.create({

	buttonContainer : {
		borderRadius: 3,
		borderColor :'#0ea378',
		backgroundColor: 'black',
		height: 40
	},
	centro: {
		marginTop: 50,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: 'white',
		alignSelf: 'center',
		marginTop: 8
	},
	container: {
		flex: 1,
		padding: 16,
		marginTop: 50
	},
	inputsContainer: {
		marginTop : 150
	},
	textInput: {
		height: 40,
		marginBottom: 10,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#0ea378',
		backgroundColor: 'white',
		borderRadius: 3,
		justifyContent: 'flex-end'
	}
});

module.exports = SearchSummoner;
