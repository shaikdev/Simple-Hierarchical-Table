import React, { useEffect } from "react";
import { useSetState } from "utils/functions.utils"
import { useSelector } from "react-redux";
import { reducers } from "interfaces/common.interface"
// import connectSocket from "utils/socket.utils"

let socket: any

export default function Main(props: any) {
  const [state, setState] = useSetState({ signout: false, loading: false });
  const user = useSelector((store: reducers) => store.user);

  useEffect(() => {
    // socket = connectSocket();
  }, []);

  const showSuccess = (text: string) => {
    //show snack success
  }

  const throwError = (text: string) => {
    //show snack error
  }

  const setMainLoading = (loading: boolean) => {
    setState({ loading: loading })
  }

  const renderChildren = () => {
    return React.Children.map(props.children, (child: any) => {
      if (child) {
        return React.cloneElement(child, {
          user,
          showSuccess,
          throwError,
          socket,
          setMainLoading
        });
      }
    });
  };

  if (state.signout) window.location.href = "/";
  if (state.loading)
    return <div>Loading</div>
  return (
    <div>
      {
        renderChildren()
      }
    </div>
  )
}
