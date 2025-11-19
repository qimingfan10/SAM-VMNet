function queue =duilie(i,shortestPath,queue,pointData)
   if i >= size(shortestPath, 1)-1
        return 
   end
    % 初始化当前点和下一点的半径

  while i<=(size(shortestPath, 1) - 1) %找到第一个递减的点，入队，之后break
    currentPoint = shortestPath(i, :);
    nextPoint = shortestPath(i + 1, :);
    % 使用 getRadius 函数获取当前点和下一点的半径
    currentRadius = getRadius(pointData, currentPoint);
    nextRadius = getRadius(pointData, nextPoint);
   if currentRadius > nextRadius
        % 如果当前点的半径大于下一个点的半径，将当前点入队
        queue=[queue;currentPoint];
       break;
   else
       i=i+1;
   end
  end

while i<=(size(shortestPath, 1) - 1)%找到递减序列的最后一个点（V型的底部）
    currentPoint = shortestPath(i, :);
    nextPoint = shortestPath(i + 1, :);
    % 使用 getRadius 函数获取当前点和下一点的半径
    currentRadius = getRadius(pointData, currentPoint);
    nextRadius = getRadius(pointData, nextPoint);
    if  currentRadius >= nextRadius
        i=i+1;
    else
      queue=[queue;currentPoint];

        break;
    end
end
while i<=(size(shortestPath, 1) - 1)%找到最后一个递增的点
    currentPoint = shortestPath(i, :);
    nextPoint = shortestPath(i + 1, :);
    % 使用 getRadius 函数获取当前点和下一点的半径
    currentRadius = getRadius(pointData, currentPoint);
    nextRadius = getRadius(pointData, nextPoint);
    if currentRadius <= nextRadius
        i=i+1;
    else
         queue=[queue;currentPoint];

        break
    end
end

%开始新的一个循环，采用嵌套调用，新的起点为当前点。
queue=duilie(i,shortestPath,queue,pointData);

end








