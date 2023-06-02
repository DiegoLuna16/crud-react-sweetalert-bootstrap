import './App.css';
import {useState} from "react";
import Axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import Swal from 'sweetalert2'


function App() {

const [nombre,setNombre] = useState("");
const [descripcion,setDescripcion] = useState("");
const [precio,setPrecio] = useState();
const [marca,setMarca] = useState("");
const [stock,setStock] = useState();
const [categoria,setCategoria] = useState("");
const [id,setId] = useState();


const [editar,setEditar] = useState(false);

const [productosLista,setProductos] = useState([]);

const add = ()=>{
  Axios.post("http://localhost:3001/create",{
    nombre:nombre,
    descripcion:descripcion,
    precio:precio,
    marca:marca,
    stock:stock, 
    categoria:categoria
  }).then(()=>{
    getProductos();
    limpiarCampos();
    Swal.fire({
      title: "<strong>Registro Exitoso!</strong>",
      html: "<i>El producto <strong>"+nombre+"</strong> fue registrado con exito!</i>",
      icon: 'success',
      timer:3000
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal!',
      })
    });
  });
}

const update = ()=>{
  Axios.put("http://localhost:3001/update",{
    id:id,
    nombre:nombre,
    descripcion:descripcion,
    precio:precio,
    marca:marca,
    stock:stock, 
    categoria:categoria
  }).then(()=>{
    getProductos();
    limpiarCampos();
    Swal.fire({
      title: "<strong>Producto Actualizado!</strong>",
      html: "<i>El producto <strong>"+nombre+"</strong> ha sido actualizado con exito!</i>",
      icon: 'success',
      timer:3000
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal!',
      })
    });
    
  });
}

const eliminarProducto = (val)=>{

  Swal.fire({
    title: 'Confirmar eliminado?',
    html: "<i>Desea eliminar a <strong>"+val.nombre+"</strong> ?</i>",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, eliminarlo!'
  }).then((result) => {
    if (result.isConfirmed) {
      Axios.delete(`http://localhost:3001/delete/${val.id}`).then(()=>{
      getProductos();
      limpiarCampos();
      Swal.fire({
        title: "<strong>" +val.nombre+"</strong> fue eliminado!",
        icon:'success',
        timer: 2000
      });
    }).catch(function(error){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salio mal!',
      })
    });
  }
});


}

const limpiarCampos = ()=>{
  setNombre("");
  setDescripcion("");
  setPrecio("");
  setMarca("");
  setStock("");
  setCategoria("");
  setEditar(false);

}

const editarProducto =(val)=>{
    setEditar(true);

    setNombre(val.nombre);
    setDescripcion(val.descripcion);
    setPrecio(val.precio);
    setMarca(val.marca);
    setStock(val.stock);
    setCategoria(val.categoria);
    setId(val.id);
}


  const getProductos = ()=>{
    Axios.get("http://localhost:3001/productos").then((response)=>{
      setProductos(response.data);
    });
  }



  return ( 
  <div className='container'>

      <div className="card text-center">
        <div className="card-header">
          GESTION DE PRODUCTOS
        </div>
        <div className="card-body">

          <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Nombre:</span>
          <input type="text"
            onChange={(event)=>{
              setNombre(event.target.value);
            }}
          className="form-control" value={nombre} placeholder="Ingrese el nombre del producto" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Descripcion:</span>
          <input type="text"
            onChange={(event)=>{
              setDescripcion(event.target.value);
            }}
          className="form-control" value={descripcion} placeholder="Ingrese descripcion del producto" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Precio:</span>
          <input type="number"
            onChange={(event)=>{
              setPrecio(event.target.value);
            }}
          className="form-control" value={precio} placeholder="Ingrese el precio del producto" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Marca:</span>
          <input type="text"
            onChange={(event)=>{
              setMarca(event.target.value);
            }}
          className="form-control" value={marca} placeholder="Ingrese la marca del producto" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Stock:</span>
          <input type="number"
            onChange={(event)=>{
              setStock(event.target.value);
            }}
          className="form-control" value={stock} placeholder="Ingrese el stock del producto" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>

            <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">Categoria:</span>
          <input type="text"
            onChange={(event)=>{
              setCategoria(event.target.value);
            }}
          className="form-control" value={categoria} placeholder="Ingrese la categoria del producto" aria-label="Username" aria-describedby="basic-addon1"/>
            </div>            

        </div>
        <div className="card-footer text-muted">
          {
            editar?
            <div>
            <button className='btn btn-warning m-2' onClick={update}>Actualizar</button>
            <button className='btn btn-danger m-2' onClick={limpiarCampos}>Cancelar</button>
            </div>
            :<button className='btn btn-success' onClick={add}>Registrar</button>
          }
        </div>

	<div className='lista'>
         <button onClick={getProductos}>Mostrar Productos</button> 

        </div>

      </div>

          <table className="table table-striped">
          <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion </th>
          <th scope="col">Precio</th>
          <th scope="col">Marca</th>
          <th scope="col">Stock</th>
          <th scope="col">Categoria</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>

        {
          productosLista.map((val,key)=>{
            return<tr key={val.id}>
                        <th>{val.id}</th>
                        <td>{val.nombre}</td>
                        <td>{val.descripcion}</td>
                        <td>{val.precio}</td>
                        <td>{val.marca}</td>
                        <td>{val.stock}</td>
                        <td>{val.categoria}</td>
                        <td>
                        <div className="btn-group" role="group" aria-label="Basic example">
                          <button type="button"
                          onClick={()=>{
                            editarProducto(val)
                          }}
                          className="btn btn-info">Editar</button>
                          <button type="button" onClick={()=>{
                              eliminarProducto(val);
                          }}className="btn btn-danger">Eliminar</button>
                        </div>
                        </td>
                  </tr>

          })
        }

            </tbody>
          </table>


      </div>
  );

}

export default App;

