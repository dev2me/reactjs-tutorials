var Saludo = React.createClass({
	render: function() { 
	return (
			<div>
				<h1>Hola Mundo</h1>
				<h2>Planeta Tierra</h2>
				<p>
					Buen dia {this.props.nombre} <br/>
					<i>{this.props.children}</i>
				</p>
			</div>
		)
	}
});

ReactDOM.render(
	<div>
		<Saludo nombre="Jesus Rosas">
			Toluca
		</Saludo>
		<Saludo nombre="Pablo Aranda">
			Querétaro
		</Saludo>
		<Saludo nombre="Andy Mendoza">
			Toluca
		</Saludo>
	</div>,
	document.getElementById('mensaje'))