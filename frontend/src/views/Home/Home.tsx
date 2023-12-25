import { Button, Form, Input, Modal } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import './style.css';
import axios from 'axios';
import { API_PREFIX } from '../../store/services/api';
import { toast } from 'react-toastify';
import Card from './components/Card';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cars, setCars] = useState([]);

  const accessToken = localStorage.getItem('access_token');

  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    }),
    [accessToken]
  );

  useEffect(() => {
    axios.get(`${API_PREFIX}cars`, config).then((response) => setCars(response.data));
  }, [config]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      axios
        .post(`${API_PREFIX}cars`, values, config)
        .then((response) => {})
        .then(() => axios.get(`${API_PREFIX}cars`, config))
        .then((response) => setCars(response.data));

      toast.success('Successfully Deleted');
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Error While adding a new car');
    }
  };

  const onDelete = useCallback(
    async (id: number) => {
      await axios
        .delete(`${API_PREFIX}cars/${id}`, config)
        .then(() => axios.get(`${API_PREFIX}cars`, config))
        .then((response) => setCars(response.data));
      toast.success('Successfully Deleted');
    },
    [config]
  );

  useEffect(() => {
    axios.get(`${API_PREFIX}cars`, config).then((response) => setCars(response.data));
  }, [onDelete, config]);

  return (
    <div className="home-wrapper">
      <div className="cards-wrapper">
        {cars?.map((car: any) => (
          <Card id={car.id} onDelete={onDelete} make={car.make} model={car.model} year={car.year} />
        ))}
      </div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Add Car" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Make"
            name="make"
            rules={[{ required: true, message: 'Please input car make!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Model"
            name="model"
            rules={[{ required: true, message: 'Please input car model!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Year"
            name="year"
            rules={[{ required: true, message: 'Please input car year!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit" onClick={form.submit}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Home;
