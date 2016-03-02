//Componente Comida
var Comida = React.createClass({
	getInitialState : function() {
		return {
			like: Boolean(this.props.like),
			editing: false
		}
	},
	handleLike: function(){
		this.setState({
			like: !this.state.like
		})
	},

	edit: function() {
		this.setState({editing: true});
	},

	save: function() {
		this.props.onChange(this.refs.nuevoNombre.value, this.props.index);	
		this.setState({editing: false});
	},

	remove: function() {
		this.props.onRemove(this.props.index);
	},

	cancel: function() {
		this.setState({editing: false});
	},

	showEditingView: function() {
		return (
			<div className="comida">
				<input ref="nuevoNombre" type="text" className="form-control" placeholder="Nuevo nombre" defaultValue={this.props.nombre}/>
				<div>
					<div className="glyphicon glyphicon-ok-circle blue" onClick={this.save} />
					<div className="glyphicon glyphicon-remove-circle red" onClick={this.cancel} />
				</div>
			</div>
		)
	},

	showFinalView : function() {
		return (
			<div className="comida">
				<h1 className="bg-success">{this.props.nombre}</h1>
				<p className="bg-info">
					Comida <i>{this.props.children}</i>
				</p>
				<p>
					<input type="checkbox" 
								onChange={this.handleLike} 
								defaultChecked={this.state.like}
								className="glyphicon glyphicon-heart glyphicon-heart-lg"/>
					<br/>
					Like: {String(this.state.like)}
				</p>
				<div>
				<div className="glyphicon glyphicon-pencil blue" onClick={this.edit} />
					<div className="glyphicon glyphicon-trash red" onClick={this.remove} />
				</div>
			</div>
		);
	},

	render: function() {
		if(this.state.editing) {
			return this.showEditingView();
		} else {
			return this.showFinalView();
		}
	}
});


/*Modulo Lista Comida*/

var ListaComida = React.createClass({

	getInitialState: function() {
		return {
			comidas : [

				'tacos',
				'paella',
				'ceviche',
				'Mole'
			]
		}
	},
	componentWillMount: function() {
			var pais;
			var s = this;

			$.getJSON("https://restcountries.eu/rest/v1/all", function(data) {
				for(pais in data){
					console.log(pais, data[pais].name);
					s.add(data[pais].name);
				}
			});
		},
	add: function(comida){
		var nuevaComida = this.refs.nuevaComida.value;

		if(nuevaComida == "") {
			if(typeof nuevaComida == 'undefined')
			{
				nuevaComida = "Nueva Comida"
			}
			else{
				var arr = this.state.comidas;
				arr.push(nuevaComida)
				this.setState({comidas: arr});
				this.refs.nuevaComida.value="";
			}
		}
	},

	update: function(nuevoNombre, i) {
		var arr = this.state.comidas;
		arr[i] = nuevoNombre;
		this.setState({comidas: arr});
	},

	remove: function(i) {
		var arr = this.state.comidas;
		arr.splice(i, 3);
		this.setState({comidas: arr})
	},

	eachItem: function(comida, i) {
		return( <Comida key={i} nombre={comida} index={i} onChange={this.update}> {i+1} </Comida> )
	},

	handleKeyDown: function(e) {
		if(e.charCode === 13) {
			this.add();
		}
	},

	render: function() {
		return (
			<div className="centerBlock">
				<header>
					<h1>Mis comidas favoritas</h1>
					<i>Total: {this.state.comidas.length}</i>
				</header>
				<div className="input-group">
					<input ref="nuevaComida" type="text" className="form-control" onKeyPress={this.handleKeyDown} placeholder="Agregar nueva comida..."/>
					<span className="input-group-btn">
						<div className="btn btn-default btn-success" onClick={this.add.bind(null, "Nueva Comida")}>+</div>
					</span>
				</div>
				<div className="items">
				{ this.state.comidas.map(this.eachItem) }
				</div>
			</div>
		)
	}

});

ReactDOM.render(<ListaComida />,document.getElementById('container'));