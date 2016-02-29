/*ReactDOM.render(
	<div>
		<h1> Hola Mundo </h1>
		<h2> Buen dia</h2>
	</div>,
	document.getElementById('mensaje')
);*/

var Saludo = React.createClass({
	render: function() {
		return (
				<h1>Hola Mundo</h1>
			)
	}
}); 

ReactDOM.render(
	
	<div>
		<Saludo />
		<Saludo />
		<Saludo />
	</div>,
	document.getElementById('mensaje')
)