import { cloneElement, PureComponent } from 'react'
import PropTypes from 'prop-types'

const { oneOfType, arrayOf, node, func, string } = PropTypes

export default class Midtrans extends PureComponent {
  
  static getDerivedStateFromProps(nextProps, prevState) {
    return nextProps.token !== prevState.token
      ? { token: nextProps.token }
      : null
  }

  constructor(props) {
    super(props)
    const { NODE_ENV: ENV } = process.env
    this.state = {
      children: null,
      token: '',
    }
    // bind react-midtrans method
    // this.mergeWithChildren = this.mergeWithChildren.bind(this)
    // backup currentview
    this.currentViewport = document
      .getElementsByTagName('meta')
      .hasOwnProperty('viewport')
      ? document.getElementsByTagName('meta').viewport
      : ''
    // create element for script
    this.snapScript = document.createElement('script')

    // checking environment mode
    // this.snapScript.src =
    //   ENV === 'production'
    //     ? 'https://app.midtrans.com/snap/snap.js'
    //     : 'https://app.sandbox.midtrans.com/snap/snap.js'
	
	this.snapScript.src = process.env.REACT_APP_SNAP
	
    this.snapScript.type = 'text/javascript'
    this.snapScript.onload = this.onLoad.bind(this)
    this.snapScript.dataset.clientKey = props.clientKey
  }

  onLoad(e) {
    if ('snap' in window) {
      const { snap } = window
      this.setState({ snap })
    }
  }

  componentDidMount() {
    document.head.appendChild(this.snapScript)
    // this.mergeWithChildren(this.props.children)
	setTimeout(() => {
		this.state.snap.pay(
			this.state.token,
			/** @todo options **/
		)	
	}, 1000);


  }

  mergeWithChildren(children) {
    children = cloneElement(
      children,
      // Assign new Props
      {
        onClick: () => {
			alert("ha;;o")
          // If Children have a onClick
          children.onClick && children.onClick()
          if (this.state.token && this.state.token !== '') {
            this.state.snap.pay(
              this.state.token,
              /** @todo options **/
            )
          }
          this.props.onClick && this.props.onClick()
        },
      },
    )

    this.setState({
      children,
    })
  }

  render() {
    return this.state.children
  }
}

/**
 * @module SnapMidtrans
 * @param {Object} props
 * @property {ReactElement} children - required
 * @property {String} token
 * @todo 4 callback
 * @property {Function} onSuccess
 * @property {Function} onError
 * @property {Function} onPending
 * @property {Function} onClose
 */
Midtrans.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired,
  clientKey: string.isRequired,
  token: string,

  /* @see @link {https://snap-docs.midtrans.com/#snap-js|Midtrans API 4 Callback} */
  onSuccess: func,
  onPending: func,
  onError: func,
  onClose: func,

  /* Callback Or Custom onClick */
  onClick: func,
}
