

## [Mauri Records](https://mauri-records.netlify.app)<img src="public/images/vinilo.png" width="80">

<h4>Descripcion</h4>

 Mauri Recors, es una web de venta de vinilos de segunda mano, en el que podras tanto comprar como vender vinilo con otras personas.

[Server](https://github.com/Manudominguez1994/MAURI-RECORDS)
[Cliente](https://github.com/Manudominguez1994/MAURI-RECORDS-FE)

<h4>Funcionalidades a implementar</h4>

- Estamos en proceso de implementar un proceso de pago mediante un Api externa.

- Implementar un chat para los clientes para que puedan hablar entre ellos para cofirmar algun tipo de compra que vayan a realizar en nuestra web.

- Incluir la opcion de crear una sesion de Club en que el usuario pueda subcribirse, aqui tendra opcion a descuentos y a funcionalidades de perfil unicas.

<h4>Tecnologias utilizadas</h4>

- HTML, CSS.

- Javascript.

- Express.

- Node

- React.

- Axios

- React

- Context

- Token

- Boostrap

- PostMan

<h4>Estructura del servidor</h4>

<h6>Modelo usuario</h6>
email: {type: String,required: [true, "Email is required."], unique: true lowercase: true,
trim: true,},
password: {type: String,required: [true, "Password is required."],},
name: {type: String,required: true,},
image: { type: String,default: "https://res.cloudinary.com/dausfjvtt/image/upload/v1693589414/Mauri%20Records/ywcxq9aolbl96745ibeh.jpg"},
role: {type: String, enum: ["admin", "user"],default: "user",},
city: String,favorite: [{type: Schema.Types.ObjectId,ref: "Vinyl", }]
// this second object adds extra properties: `createdAt` and `updatedAt`timestamps: true

<h6>Modelo Vinilos</h6>

title: {type: String, required: true,},
artist: {type: String, required: true, },
image: {type: String, default:"https://res.cloudinary.com/dausfjvtt/image/upload/v1693589414/Mauri%20Records/ywcxq9aolbl96745ibeh.jpg",},
description: String, price: { type: Number,required: true, },
sellerUser: {type: Schema.Types.ObjectId,ref: "User",},
stateConservation: {type: String, enum: ["Como Nuevo", "Buen estado", "Algo desgastado", "Muy Desgastado"],},
onSale: {type: Boolean, default: true },
genre: { type: String, enum: ["Rock", "Pop", "Hip-Hop", "Jazz", "Electronica", "Soul", Reagge","Otros"],  // this second object adds extra properties: `createdAt` and `updatedAt`
timestamps: true,}

<h6>Modelo Operacion</h6>

product: { type: Schema.Types.ObjectId, ref: "Vinyl",}
buyerUser: {type: Schema.Types.ObjectId, ref: "User",}
sellerUser: {type: Schema.Types.ObjectId,ref: "User",}
totalPrice:{type: Number,}
valoration:{type: String}
// this second object adds extra properties: `createdAt` and `updatedAt`
timestamps: true,

<h4>Rutas Bakcend</h4>

<table>
<tr>

<td><strong>HTTP Method</strong></td>

<td><strong>URL</strong></td>

<td><strong>Resquest Body</strong></td>

<td><strong>Success Status</strong></td>

<td><strong>Error Status</strong></td>

<td><strong>Description</strong></td>

</tr>
<tr>

<td>get</td>

<td>/user</td>

<td></td>

<td>200</td>

<td>400</td>

<td>Todas las propiedades del perfil</td>

</tr>
<tr>

<td>put</td>

<td>/user</td>

<td>nombre completo, imagen, email, password</td>

<td>200</td>

<td>400</td>

<td>Actualizar el perfil</td>

</tr>
<tr>

<td>delete</td>

<td>/user</td>

<td></td>

<td></td>

<td>401</td>

<td>Borrar perfil</td>

</tr>
<tr>

<td>get</td>

<td>/allvinyls</td>

<td></td>

<td>200</td>

<td>400</td>

<td>Enviar todo los vinilos</td>

</tr>
<tr>

<td>get</td>

<td>/vinyls/:vinylId</td>

<td></td>

<td>200</td>

<td>400</td>

<td>Enviar detalles de un vinilo</td>

</tr>
<tr>

<td>post</td>

<td>/vinyls/:vinylId</td>

<td>titulo, artista, imagen, descripcion, precio, estado de conservacion, genero, estado de pedido, fecha de publicacion</td>

<td>200</td>

<td>400</td>

<td>Agregar vinilo</td>

</tr>
<tr>

<td>put</td>

<td>/vinyls/:vinylId</td>

<td>titulo, artista, imagen, descripcion, precio, estado de conservacion, genero, estado de pedido, fecha de publicacion</td>

<td>200</td>

<td>400</td>

<td>Editar info vinilo</td>

</tr>
<tr>

<td>delete</td>

<td>/vinyls/:vinylId</td>

<td>titulo, artista, imagen, descripcion, precio, estado de conservacion, genero, estado de pedido, fecha de publicacion</td>

<td>200</td>

<td>400</td>

<td>Borrar vinilo</td>

</tr>
<tr>

<td>post</td>

<td>/operacion</td>

<td>nombre producto, usuario comprador, usuario vendedor, fecha, precio</td>

<td>200</td>

<td>400</td>

<td>Crear operacion</td>

</tr>
<tr>

<td>get</td>

<td>/operacion/compradorId</td>

<td></td>

<td>200</td>

<td>400</td>

<td>muestra operaciones</td>

</tr>
<tr>

<td>get</td>

<td>/operacion/vendedorId</td>

<td></td>

<td>200</td>

<td>400</td>

<td>muestra operaciones</td>

</tr>
<tr>

<td>post</td>

<td>/signup</td>

<td></td>

<td>200</td>

<td>400</td>

<td>registrar un usuario</td>

</tr>
<tr>

<td>post</td>

<td>/login</td>

<td></td>

<td></td>

<td></td>

<td>iniciar sesion con un usuario</td>

</tr>
<tr>

<td>get</td>

<td>/verify</td>

<td></td>

<td>200</td>

<td>400</td>

<td>verifica que el usuario esta conectado</td>

</tr>

</table>

<h4>Link</h4>

[Uriel](https://github.com/uriel-gartzia)
[Manu](https://github.com/Manudominguez1994)

<h4>Proyecto</h4>

[Repositorio Cliente Link](https://github.com/Manudominguez1994/MAURI-RECORDS-FE)
[Repositorio Server Link](https://github.com/Manudominguez1994/MAURI-RECORDS)
[Deploy Link](https://mauri-records.netlify.app)

<h4>Trello</h4>

[Trello Link](https://trello.com/b/tPCTZAsZ/proyecto-modulo-3)