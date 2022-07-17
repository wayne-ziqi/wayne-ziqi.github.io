# Jupyter Notebook切换conda虚拟环境

## 一、安装插件

通过下面命令安装插件：

```shell
conda install nb_conda
```

## 二、在虚拟环境中安装jupyter
​	我们安装完nb_conda插件后，打开jupyter在自己的Jupyter笔记中点击“Kernel → Change kernel”应该就可以切换虚拟环境了。我们除了安装插件外，还需要在你所建的每个虚拟环境中安装jupyter notebook。

### 1、进入虚拟环境
首先我们先进入虚拟环境，命令如下：

* Linux&mac环境：
```shell
source activate your_env_name
```

* Windows：
```shell
conda activate your_env_name
```
### 2、在虚拟环境中安装jupyter
命令如下：
```shell
conda install -y jupyter
```
安装以上命令，在每个虚拟环境中安装jupyter就可以了。

## 三、重启jupyter
此时我们已经把该安装的东西都安装好了，退出虚拟环境，我们需要重启一下jupyter。重启后，打开笔记点击Kernel → Change kernel就可以切换虚拟环境了。

如果是多个虚拟环境，我们可以通过右上角看到我们当前在哪个环境下面。秒切换环境，真是方便极了。

## 四、可能遇到的错误
错误1：EnvironmentLocationNotFound: Not a conda environment
打开jupyter后点击Conda会弹出这样的错误：

解决方法：

找到Anaconda安装路径下nb_conda库的envmanager.py文件

win系统在目录：Anaconda3\Lib\site-packages\nb_conda\envmanager.py

linux系统在目录：Anaconda3/pkgs/nb_conda-2.2.1-py36_0/lib/python3.6/site-packages/nb_conda/envmanager.py

找到该文件后在83~86行有这样一段代码：
```python
return {
"environments": [root_env] + [get_info(env)
for env in info['envs']]
}
```
我们将此段代码改成如下：
```python
return {
"environments": [root_env] + [get_info(env) for env in info['envs'] if env != root_env['dir']]
}
```
然后重启jupyter就可以了。

错误2：AttributeError: ‘dict’ object has no attribute 'rsplit’

解决方法：

找到Anaconda安装路径下文件：Anaconda3\Lib\site-packages\nb_conda\envmanager.py

修改内容：
```python
    name, version, build = s.rsplit('-', 2)
```
修改成:
```python
    if isinstance(s, dict):
        s = s['dist_name']
    name, version, build = s.rsplit('-', 2) 
```
然后重启jupyter。

错误3：’_xsrf’ argument missing from POST

解决方法：

用户家目录下 .jupyter/jupyter_notebook_config.json文件添加：
```json
"disable_check_xsrf": true
```
然后重启jupyter。

如果没有报错的话，就可以在jupyter中新建python环境了，需要注意的是新建的环境需要安装ipykernel包，才会显示在新建note菜单中。

如果看不到的话，强制刷新下页面就好了。

## 五、补充
### 1、conda更新
conda的更新方法：
```shell
conda update -n base conda -c conda-forge
```
### 2、安装nbextensions插件
* 通过pip安装
```shell
pip install jupyter_contrib_nbextensions
#通过conda安装
conda install -c conda-forge jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
```
然后重启jupyter即可看到nbextensions选项卡。



转自：https://blog.csdn.net/IT_xiao_bai/article/details/102765922