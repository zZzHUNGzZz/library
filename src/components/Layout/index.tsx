import { useState } from 'react';
import { Button, Col, Layout, Menu, Row, theme } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { FaRegCircleUser } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import publicRouter from '../Router';
import PageRouter from '../Router/router.config';
import './../../App.css'

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250}>
                <div className="demo-logo-vertical">Library</div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={publicRouter}
                    onClick={({ key }) => navigate(key)}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Row>
                        <Col span={4}>
                            <Button
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => setCollapsed(!collapsed)}
                                style={{
                                    fontSize: '16px',
                                    width: 64,
                                    height: 64,
                                }}
                            />
                        </Col>
                        <Col span={20} className='header-col-right-user'>
                            <FaRegCircleUser style={{ width: 20, height: 20, marginRight: 8 }} />
                            <span style={{ marginRight: 16 }}>Đào Đức Hưng</span>
                        </Col>
                    </Row>
                </Header>
                <Content style={{ margin: '20px 20px', backgroundColor: '#F0F0F0' }}>
                    <PageRouter />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Design by <strong>Đào Đức Hưng</strong>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
