import PropTypes from 'prop-types';
import React from 'react';
import { Col } from 'reactstrap';
import uuidv4 from 'uuid/v4';
import s from './InfoTile.module.scss';

class InfoTile extends React.Component {

  static propTypes = {
    title: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    close: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    fullscreen: PropTypes.bool,
    collapse: PropTypes.bool,
    refresh: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    settings: PropTypes.bool,
    settingsInverse: PropTypes.bool,
    tooltipPlacement: PropTypes.string,
    showTooltip: PropTypes.bool,
    bodyClass: PropTypes.string,
    customControls: PropTypes.bool,
    options: PropTypes.object, //eslint-disable-line,
    fetchingData: PropTypes.bool,
  };

  static defaultProps = {
    title: null,
    className: '',
    children: [],
    close: false,
    fullscreen: false,
    collapse: false,
    refresh: false,
    settings: false,
    settingsInverse: false,
    tooltipPlacement: 'bottom',
    showTooltip: false,
    bodyClass: '',
    customControls: false,
    customClose: null,
    customExpand: null,
    customCollapse: null,
    customFullscreen: null,
    customReload: null,
    customDropDown: null,
    prompt: false,
    collapsed: false,
    options: {},
    fetchingData: false,
    widgetType: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      randomId: uuidv4(),
      hideWidget: false,
      collapseWidget: !!props.collapsed,
      height: props.collapsed ? 0 : 'auto',
      fullscreened: false,
      reloading: false,
      modal: false,
      apiData: ''
    }

  }





  render() {

    const {
      title,
      className,
      children,
      close,
      fullscreen,
      collapse,
      refresh,
      settings,
      settingsInverse,
      tooltipPlacement,
      showTooltip,
      bodyClass,


      options, //eslint-disable-line
      ...attributes
    } = this.props;





    return (
      <div
        style={{
          background: "radial-gradient(farthest-side ellipse at 10% 0, " + this.props.bgStartColor
            + " 20%, " + this.props.bgEndColor + ")"
        }}

        className={s.body}
      >

        <h4 className={"fw-bold"}  style={{ color:"#000"}}>{this.props.primaryAmount}</h4>
        <h4 style={{ color:"#000"}}>{this.props.primaryTitle}</h4>



        <hr className="solid" />

        <h4 className={"fw-bold"}  style={{ color:"#000"}}>{this.props.secondaryAmount}</h4>
        <h4  style={{ color:"#000"}}>{this.props.secondaryTitle}</h4>


      </div>

    );
  }
}

export default InfoTile;
