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
      <React.Fragment >
        <section
          style={{
            background: "radial-gradient(farthest-side ellipse at 10% 0, " + this.props.bgStartColor
              + " 20%, " + this.props.bgEndColor + ")" ,
              height:"100%"
          }}
          className={s.body}
        >

          <Col style={{

          }}>
            <h3 className={s.title}>{this.props.primaryAmount}</h3>


            <h4 className={"fw-bold"} style={{ fontSize: "15px" }}>{this.props.primaryTitle}</h4>

          </Col>

          <hr className="solid" />

          <div style={{
            "paddingLeft": "20px",

          }}>
            <h6 className={"fw-bold"}>{this.props.secondaryTitle}</h6>
            <h5 >{this.props.secondaryAmount}</h5>



          </div>



        </section>

      </React.Fragment>
    );
  }
}

export default InfoTile;
