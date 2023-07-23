export const ListUsers = ({ deleteUser, showColors, users }) => {
  return (
    <table width= '100%' >
      <thead>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Apellido</th>
          <th>Pais</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
      {
        users.map((user, index) =>{
          const bgColor = index % 2 === 0 ? '#999' : '#666'
          const color = showColors ? bgColor : 'transparent'
          const font = showColors ? '#fff' : '#000'
          return (
          <tr key={user.login.uuid} style={{ backgroundColor: color, color: font }}>
            <td>
              <img src={user.picture.thumbnail} alt={user.name.first} style={{borderRadius: '50%'}} />
            </td>
            <td>{user.name.first}</td>
            <td>{user.name.last}</td>
            <td>{user.location.country}</td>
            <td>
              <button onClick={() => deleteUser(user.login.uuid)}>Delete</button>
            </td>
          </tr>
        )})
      }
      </tbody>
    </table>
  )
}
