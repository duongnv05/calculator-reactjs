import React from 'react';
import Calculator from './Calculator';
import { shallow } from 'enzyme';
describe('<Calculator />', () => {
  it('get result when press(or click) =', () => {
    const wrapper = shallow(<Calculator />);

    wrapper.setState({
      content: '1+2+3/3+5'
    })

    wrapper.find('button').at(13).simulate('click');

    expect(wrapper.state('result')).toEqual(9);
  })

  it('get result when press(or click) = (negative number)', () => {
    const wrapper = shallow(<Calculator />);

    wrapper.setState({
      content: '-11+2+3/3+5'
    })

    wrapper.find('button').at(13).simulate('click');

    expect(wrapper.state('result')).toEqual(-3);
  })

  it('user input invalid', () => {
    const wrapper = shallow(<Calculator />);

    wrapper.setState({
      content: '1+2+3/3+5'
    })

    wrapper.find('button').at(1).simulate('click');

    expect(wrapper.state('content')).toEqual('1+2+3/3+5/');
    expect(wrapper.state('result')).toEqual(9);
  })

  it('press /, invalid input the first time', () => {
    const wrapper = shallow(<Calculator />);

    wrapper.setState({
      content: '0'
    })

    wrapper.find('button').at(1).simulate('click');

    expect(wrapper.state('content')).toEqual('0');
    expect(wrapper.state('result')).toEqual(0);
  })
})