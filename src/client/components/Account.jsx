import { useState, useEffect } from "react"
import axios from "axios"

export default function Account ({ token }) {
    const [account, setAccount] = useState(null);
    const [orders, setOrders] = useState([]);
    
    
    useEffect(() => {
        async function loadAccount() {
            try {
                const accountResponse = await axios.get('', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                // accountResponse looks like { data: actual data}
                setAccount(accountResponse.data) // instead of `const { data } =`

                const ordersResponse = await axios.get('', {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                // ordersResponse looks like { data: actual data }
                console.log('ordersResponse', ordersResponse)
                setOrders(ordersResponse.data.orders)
            } catch (err) {
                console.error(err)
            }
        }
        loadAccount()
    }, [token])

    if (!account) {
        return <div>Not logged in</div>
    }

    return <main>
        <h1>{account.firstname} {account.lastname}</h1>
        <h2>{account.email}</h2>
        <div>Orders Made:
        </div>
        {
            orders.map(order => {
                return (
                    <article key={order.id}>
                        <h2>{order.title}</h2>
                        <button onClick={() => returnOrder(order.id)}>Return</button>
                    </article>
                )
            })
        }
    
    </main>

}

