import React, { Component } from 'react';
import { List } from 'react-virtualized';
import TreeItem from "@material-ui/lab/TreeItem";
import { FormControlLabel, Checkbox } from "@material-ui/core";



const Checkbox = ({ onChange, checked, label, style }) =>
  <div style={{ ...style, textAlign: 'left' }}>
    <label>
      <input
        type="checkbox"
        value={label}
        onChange={onChange}
        checked={checked || false}
      />
      {label}
    </label>
  </div>;

class Checkboxes extends Component {
  componentWillReceiveProps() {
    this.list.forceUpdateGrid();
  }

  handleChange = event => {
    const { labelKey, onChange } = this.props;
    onChange({ [labelKey]: event.target.value, checked: event.target.checked });
  };

  handleSelectAllChange = event => {
    const { onSelectAllChange } = this.props;
    onSelectAllChange(event.target.checked);
  };
  checkboxRenderer = ({ index, style }) => {
    const { items, filtered, labelKey } = this.props;

    if (index === 0) {
      const label = filtered ? '(Select all search results)' : '(Select all)';
      const checked = items.filter(i => i.checked).length === items.length;
      return (
          <TreeItem nodeId={index.toString()}
                    key={'#ALL#'}
                    label={
                      <FormControlLabel
                          style={style}
                          key={'#ALL#'}
                          label={label}
                          control={<Checkbox checked={checked}
                                             onChange={this.handleSelectAllChange}/>}
                      />
                    }
          />
      );
    }
    const item = items[index - 1];
    return (
        <TreeItem nodeId={index.toString()}
                  key={item[labelKey]}
                  label={
                    <FormControlLabel
                        style={style}
                        key={item[labelKey]}
                        label={item[labelKey]}
                        control={<Checkbox checked={item.checked}
                                           onChange={this.handleChange}/>}
                    />
                  }
        />
      // <Checkbox
      //   style={style}
      //   key={item[labelKey]}
      //   onChange={this.handleChange}
      //   label={item[labelKey]}
      //   checked={item.checked}
      // />
    );
  };
  render() {
    const { items, rowHeight, height, width } = this.props;
    const rowCount = items.length + 1;
    return (
      <List
        height={height}
        width={width}
        ref={ref => {
          this.list = ref;
        }}
        rowCount={rowCount}
        rowHeight={rowHeight}
        rowRenderer={this.checkboxRenderer}
      />
    );
  }
}

export default Checkboxes;
