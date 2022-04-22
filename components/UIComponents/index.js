import React, { useState } from 'react'

import { routes } from '../../config'
import * as AppComponent from '../index'
import './styles.scss'
import ggIcon from '../../assets/Icons/social/gg.png'
import authorHoverIcon from '../../assets/Icons/svgs/author_info_icon_hover.svg'

const UIComponents = () => {
  const [open, setOpen] = useState(false)
  const RailExample = () => (
    <AppComponent.Segment>
      <AppComponent.Image src={ggIcon} size='small' />
      <AppComponent.Rail attached internal position='left'>
        <AppComponent.Segment>Left Rail Content</AppComponent.Segment>
      </AppComponent.Rail>
      <AppComponent.Rail attached internal position='right'>
        <AppComponent.Segment>Right Rail Content</AppComponent.Segment>
      </AppComponent.Rail>
    </AppComponent.Segment>
  )

  return (
    <AppComponent.Container >
      <div className='ui-components'>
        <div className='ui-component'>
          <AppComponent.Header as='h3'>UI components</AppComponent.Header>
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Button</AppComponent.Header>
          <AppComponent.Button style={{ marginBottom: '16px' }} className='btn-primary' type='submit' disabled={false}>Button</AppComponent.Button>
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Checkbox</AppComponent.Header>
          <AppComponent.Checkbox label='Checkbox' />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Container</AppComponent.Header>
          <AppComponent.Container text>
            <AppComponent.Header as='h2'>Header</AppComponent.Header>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
              ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
              magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
              ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
              quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
              arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
              Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
              dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
              Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
              Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
              viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
              Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
            </p>
          </AppComponent.Container >
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Divider</AppComponent.Header>
          <AppComponent.Divider className='ui divider' />
          <AppComponent.Header as='h3'>Facebook</AppComponent.Header>
          <AppComponent.Icon name='facebook' />
          <AppComponent.Divider section >This is divider</AppComponent.Divider>
          <AppComponent.Header as='h3'>Google</AppComponent.Header>
          <AppComponent.Icon name='google' />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Dropdown</AppComponent.Header>
          <AppComponent.Dropdown placeholder='Select Friend' fluid selection options={[{ text: 'Friend A', value: 'friendA' }, { text: 'Friend B', value: 'friendB' }]} />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Flag</AppComponent.Header>
          <AppComponent.Flag name='vn' />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Form</AppComponent.Header>
          <AppComponent.Form>
            <AppComponent.Form.Field>
              <label>First Name</label>
              <input placeholder='First Name' />
            </AppComponent.Form.Field>
            <AppComponent.Form.Field>
              <label>Last Name</label>
              <input placeholder='Last Name' />
            </AppComponent.Form.Field>
            <AppComponent.Form.Field>
              <AppComponent.Checkbox label='I agree to the Terms and Conditions' />
            </AppComponent.Form.Field>
            <AppComponent.Button type='submit'>Submit</AppComponent.Button>
          </AppComponent.Form>
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title' style={{ marginBottom: '16px' }}>Grid</AppComponent.Header>
          <AppComponent.Grid>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
              ligula eget dolor. Aenean massa strong. Cum sociis natoque penatibus et
              magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,
              ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
              quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
              arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.
              Nullam dictum felis eu pede link mollis pretium. Integer tincidunt. Cras
              dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus.
              Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.
              Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
              viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet.
              Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi.
            </p>
          </AppComponent.Grid>
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Header</AppComponent.Header>
          <AppComponent.Header as='h5' className='no'>First Header</AppComponent.Header>
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Icon</AppComponent.Header>
          <AppComponent.Icon name='facebook square' size='large' />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Image</AppComponent.Header>
          <AppComponent.Image src={ggIcon} as='a' size='small' href='https://google.com' target='_blank' />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Input</AppComponent.Header>
          <AppComponent.Input icon='user' iconPosition='left' type='text' className='form-control' placeholder='Username' />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Label</AppComponent.Header>
          <AppComponent.Label icon='mail' > 1000 </AppComponent.Label>
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Loader</AppComponent.Header>
          <AppComponent.Loader size='large' visible inline />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Link</AppComponent.Header>
          <AppComponent.Link text='Link' href={routes.setting.user} />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Menu</AppComponent.Header>
          <AppComponent.Menu
            items={[
              { key: 'editorials', active: true, name: 'Editorials' },
              { key: 'review', name: 'Reviews' },
              { key: 'events', name: 'Upcoming Events' }
            ]}
          />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Modal</AppComponent.Header>
          <AppComponent.Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<AppComponent.Button>Basic Modal</AppComponent.Button>}
            content={<p>content modal popup</p>}
          ></AppComponent.Modal>
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>OverflowTooltip</AppComponent.Header>
          <AppComponent.OverflowTooltip content={'OverflowTooltip here'} />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Pagination</AppComponent.Header>
          <AppComponent.Pagination
            boundaryRange={0}
            defaultActivePage={1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={10} />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Placeholder</AppComponent.Header>
          <AppComponent.Placeholder content={'placeholder'} />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Popup</AppComponent.Header>
          <AppComponent.Popup content='Popup content' trigger={<span>Hover me</span>} />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Radio</AppComponent.Header>
          <AppComponent.Radio label='Radio content' />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Rail</AppComponent.Header>
          <RailExample />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Reveal</AppComponent.Header>
          <AppComponent.Reveal active animated='move'
            content={<AppComponent.Image src={authorHoverIcon} size='small' />}
          />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Segment</AppComponent.Header>
          <AppComponent.Segment content={'Segment content'} />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Step</AppComponent.Header>
          <AppComponent.Step content={'Step content'} />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>StyledDropdown</AppComponent.Header>
          <AppComponent.StyledDropDown
            dataSources={[
              { name: 'option 1', label: 'option 1' },
              { name: 'option 2', label: 'option 2' }
            ]}
          />
        </div>
        <div className='ui-component'>
          <AppComponent.Header as='h4' className='title'>Tab</AppComponent.Header>
          <AppComponent.Tab panes={[{ menuItem: 'Tab 1' }, { menuItem: 'Tab 2' }]} />
        </div>
      </div>
    </AppComponent.Container >
  )
}

export default UIComponents