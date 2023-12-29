import React from 'react'

function Items() {
  return (
 <MenuItem
              key={index}
              title={navItem.label}
              href={navItem.label === "Home" ? "/" : `/${navItem.label.toLowerCase()}`}
              icon={navItem.icon ? <navItem.icon /> : null}
              onClick={() => console.log(`${navItem.label} clicked`)} isExternal={false} />
          ))}
  )
}

export default Items